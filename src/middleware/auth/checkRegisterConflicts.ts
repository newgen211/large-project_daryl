import { Request, Response, NextFunction } from 'express';
import { ConflictErrorResponseInterface } from '../../interfaces/ConflictError';
import User from '../../models/UserModel';
import { request_logger } from '../../logs/logger';

const checkRegisterConflicts = async (req:Request, res:Response, next:NextFunction) => {

    try {

        // Extract fields from request body
        const { email, username } = req.body;

        // Initilze conflict errors
        const conflict_errors:ConflictErrorResponseInterface = { message: {} };

        // See if the email address and username are already taken
        let user = await User.findOne({ email });

        if(user !== null) {

            if(!conflict_errors.message['email']) {
                conflict_errors.message['email'] = [];
            }

            conflict_errors.message['email'].push({
                type: 'conflict',
                message: 'Email address is taken'
            });

        }

        user = await User.findOne({ username });

        if(user !== null) {

            if(!conflict_errors.message['username']) {
                conflict_errors.message['username'] = [];
            }

            conflict_errors.message['username'].push({
                type: 'conflict',
                message: 'Username is taken'
            });

        }

        if(Object.keys(conflict_errors.message).length > 0) {

            return res.status(409).json(conflict_errors);

        }

    }
    catch(error) {

        request_logger('ERROR', `Error checking for conflicting credentials: ${error}`, req, true);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

    next();

};

export default checkRegisterConflicts;
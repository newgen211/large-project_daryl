import { Request, Response } from 'express';
import { request_logger } from '../../logs/logger';
import User from '../../models/UserModel';
import { ConflictErrorResponseInterface } from '../../interfaces/ConflictError';

const registerController = async (req:Request, res:Response):Promise<any> => {

    try {

        // Extract the request fields from the body
        const { first_name, last_name, email, username, password } = req.body;
 
        return res.status(201).json({
            message: 'User registered successfully'
        });

    }
    catch(error) {

        request_logger('ERROR', `Error while registering new user: ${error}`, req, true);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

};

export default registerController;
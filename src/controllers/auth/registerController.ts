import { Request, Response } from 'express';
import { request_logger } from '../../logs/logger';

const registerController = async (req:Request, res:Response):Promise<any> => {

    try {

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
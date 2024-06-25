import { Request, Response } from 'express';
import { request_logger } from '../../logs/logger';
import { InputRequestInterface } from '../../interfaces/InputError';

const registerController = async (req:InputRequestInterface, res:Response):Promise<any> => {

    try {

        console.log(req.input_errors);

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
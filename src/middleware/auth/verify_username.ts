import { Request, Response, NextFunction } from 'express';
import User from '../../models/UserModel';
import { logger, request_logger } from '../../logs/logger'; 

interface CustomRequest extends Request {
    userExists?: boolean;
}

const verifyUsernameMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const { username } = req.params as { username: string };
    try {
        const existingUser = await User.findOne({ username });

        req.userExists = !!existingUser;
        next();
    } catch (err) {
        logger("ERROR",'Error verifying username:');
    }
};

export default verifyUsernameMiddleware;
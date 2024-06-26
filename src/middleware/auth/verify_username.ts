import { Request, Response, NextFunction } from 'express';

// Change User to what ever user modle path you have 
import User, { UserDocument } from './model/User.mjs';

const verify_username_middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = req.params as { username: string };
    try {
        const existingUser: UserDocument | null = await User.findOne({ username });

        if (existingUser) {
            req.userExists = true;
        } else {
            req.userExists = false;
        }
        next();
    } catch (err) {
        console.error('Error verifying username:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default verify_username_middleware;
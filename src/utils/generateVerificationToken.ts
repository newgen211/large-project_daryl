import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { logger } from '../logs/logger';

const generateVerificationToken = (user_id:mongoose.Types.ObjectId):string | null => {

    try {

        const token = jwt.sign(
            {
                user_id: user_id.toString()
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1h'
            }
        );

        return token;

    }
    catch(error) {

        logger('ERROR', `Error generating verification token: ${error}`, true);
        return null;
    }

};

export default generateVerificationToken;
import bcrypt from 'bcrypt';
import { logger } from '../logs/logger';

const hashPassword = async (password:string):Promise<string | null> => {

    try {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash;

    }
    catch(error) {

        logger('ERROR', `Error hashing password: ${error}`, true);
        return null;

    }

};

export default hashPassword;
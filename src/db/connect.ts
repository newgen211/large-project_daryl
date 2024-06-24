import mongoose from "mongoose";
import { logger } from "../logs/logger";

const connect = async () => {

    try {

        // Grab the URI from the env var's
        const URI = process.env.URI as string;

        await mongoose.connect(URI);
        logger('INFO', 'Connected to MongoDB', true);

        return true;

    }
    catch(error) {

        logger('ERROR', `Failed to connect to MongoDB: ${error}`, true);

        return false;

    }

};

export default connect;
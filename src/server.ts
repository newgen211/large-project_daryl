import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { logger } from './logs/logger';
import connect from './db/connect';
import authRouter from './routes/authRouter';

// Load environment variables 
dotenv.config();

const app  = express();
const PORT = process.env.PORT as string;

const startServer = async () => {

    try {

        // Create a connection to the database
        await connect();

        // Parse request body as JSON
        app.use(express.json());

        // Serve the React Frontend
        app.use(express.static(path.join(__dirname, '../client/dist')));

        // Catch-all route to serve React's index.html for client-side routing
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
        });

        // Define API routes and other middleware
        app.use('/api/auth', authRouter);

        // Start the server
        app.listen(PORT, () => {

            logger('INFO', `Server is listening on port ${PORT}`, true);
        
        });

    }
    catch(error) {

        logger('ERROR', `Failed to start server: ${error}`, true);

    }

};

startServer().catch(error => {

    logger('ERROR', `Unhandled error during server start up: ${error}`, true);

});
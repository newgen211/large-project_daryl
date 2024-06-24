import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { logger } from './logs/logger';

// Get the env variables
dotenv.config();

const app  = express();

// Parse all request bodies as json
app.use(express.json());

// Serve the react frontend
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve the api routes

// Start the server on the port
const PORT = process.env.PORT as string;
app.listen(PORT, () => {

    logger('INFO', `Server is listening on port ${PORT}`, true);

});
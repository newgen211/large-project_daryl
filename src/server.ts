import dotenv from 'dotenv';
import express from 'express';
import { logger } from './logs/logger';

dotenv.config();

const app  = express();
const PORT = process.env.PORT as string;

app.use(express.json());


app.listen(PORT, () => {

    logger('INFO', `Server is listening on port ${PORT}`, true);

});
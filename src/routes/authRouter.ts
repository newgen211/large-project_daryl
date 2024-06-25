import express from 'express';
import registerController from '../controllers/auth/registerController';
import sanitizeInput from '../middleware/sanitizeInput';

const authRouter = express.Router();

authRouter.use(sanitizeInput);

authRouter.post('/register', registerController);

export default authRouter;
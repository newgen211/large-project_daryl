import express from 'express';
import registerController from '../controllers/auth/registerController';
import sanitizeInput from '../middleware/sanitizeInput';
import validateRegisterInput from '../middleware/auth/validateRegisterInput';

const authRouter = express.Router();

authRouter.use(sanitizeInput);

authRouter.post('/register', validateRegisterInput, registerController);

export default authRouter;
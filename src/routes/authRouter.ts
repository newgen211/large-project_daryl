import express from 'express';
import registerController from '../controllers/auth/registerController';
import sanitizeInput from '../middleware/sanitizeInput';
import validateRegisterInput from '../middleware/auth/validateRegisterInput';
import checkRegisterConflicts from '../middleware/auth/checkRegisterConflicts';

const authRouter = express.Router();

authRouter.use(sanitizeInput);

authRouter.post('/register', validateRegisterInput, checkRegisterConflicts, registerController);

export default authRouter;
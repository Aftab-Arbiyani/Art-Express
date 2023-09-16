import express from 'express';
import authController from '../controllers/auth-controller';

const authRouter = express.Router();

authRouter.post('/signup-user', authController.signupUser);
authRouter.post('/login', authController.login);

export default authRouter;

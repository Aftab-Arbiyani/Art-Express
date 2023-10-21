import express from 'express';
import authController from '../controllers/auth-controller';
import validationMiddleware from '../middleware/validation-middleware';
import { signupSchema } from '../utils/validation/create/signup-validation';
import { loginSchema } from '../utils/validation/create/login-validation';

const authRouter = express.Router();

authRouter.post('/signup-user', validationMiddleware(signupSchema), authController.signupUser);
authRouter.post('/login-user', validationMiddleware(loginSchema), authController.loginUser);
authRouter.post('/signup-artist', validationMiddleware(signupSchema), authController.signupArtist);
authRouter.post('/login-artist', validationMiddleware(loginSchema), authController.loginArtist);

export default authRouter;

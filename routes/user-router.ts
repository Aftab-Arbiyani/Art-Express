import express from 'express';
import verifyToken from '../middleware/verifyToken';
import userController from '../controllers/user-controller';
import validationMiddleware from '../middleware/validation-middleware';
import { profileImageUpload } from '../middleware/upload-image';
import { userEditSchema } from '../utils/validation/edit/user-validation';

const userRouter = express.Router();

userRouter.get('', userController.findAndCountAll);
userRouter.get('/:id', verifyToken, userController.findByPk);
userRouter.patch('', verifyToken, profileImageUpload.single('profile_picture'), validationMiddleware(userEditSchema), userController.editProfile);
userRouter.delete('/:id', verifyToken, userController.deleteByPk);

export default userRouter;

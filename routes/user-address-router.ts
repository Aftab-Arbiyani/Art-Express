import express from 'express';
import verifyToken from '../middleware/verifyToken';
import userAddressController from '../controllers/user-address-controller';
import validationMiddleware from '../middleware/validation-middleware';
import { userAddressCreateSchema } from '../utils/validation/create/user-address-validation';

const userAddressRouter = express.Router();

userAddressRouter.post('', verifyToken, validationMiddleware(userAddressCreateSchema), userAddressController.create);
userAddressRouter.get('', verifyToken, userAddressController.findAndCountAll);
userAddressRouter.get('/:id', verifyToken, userAddressController.findByPk);
userAddressRouter.patch('/:id', verifyToken, validationMiddleware(userAddressCreateSchema), userAddressController.updateByPk);
userAddressRouter.delete('/:id', verifyToken, userAddressController.deleteByPk);

export default userAddressRouter;

import express from 'express';
import verifyToken from '../middleware/verifyToken';
import cartController from '../controllers/cart-controller';
import validationMiddleware from '../middleware/validation-middleware';
import { fkArtSchema } from '../utils/validation/other/fk-art-validation';

const cartRouter = express.Router();

cartRouter.post('', verifyToken, validationMiddleware(fkArtSchema), cartController.addToCart);
cartRouter.get('', cartController.findAndCountAll);
cartRouter.get('/:id', verifyToken, cartController.findByPk);
cartRouter.patch('/:id', verifyToken, cartController.updateByPk);
cartRouter.delete('/:id', verifyToken, cartController.removeCartItems);

export default cartRouter;

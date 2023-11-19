import express from 'express';

import cartItemsController from '../controllers/cart-items-controller';

const cartItemsRouter = express.Router();

cartItemsRouter.post('', cartItemsController.create);
cartItemsRouter.get('', cartItemsController.findAndCountAll);
cartItemsRouter.get('/:id', cartItemsController.findByPk);
cartItemsRouter.patch('/:id', cartItemsController.updateByPk);
cartItemsRouter.delete('/:id', cartItemsController.deleteByPk);

export default cartItemsRouter;

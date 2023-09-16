import express from 'express';
import verifyToken from '../middleware/verifyToken';
import artistsController from '../controllers/artists-controller';

const artistsRouter = express.Router();

artistsRouter.post('', verifyToken, artistsController.create);
artistsRouter.get('', artistsController.findAndCountAll);
artistsRouter.get('/:id', verifyToken, artistsController.findByPk);
artistsRouter.patch('/:id', verifyToken, artistsController.updateByPk);
artistsRouter.delete('/:id', verifyToken, artistsController.deleteByPk);

export default artistsRouter;

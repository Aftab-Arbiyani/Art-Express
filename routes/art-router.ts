import express from 'express';
import verifyToken from '../middleware/verifyToken';
import artController from '../controllers/art-controller';

const artRouter = express.Router();

artRouter.post('', verifyToken, artController.create);
artRouter.get('', artController.findAndCountAll);
artRouter.get('/:id', artController.findByPk);
artRouter.patch('/:id', verifyToken, artController.updateByPk);
artRouter.delete('/:id', verifyToken, artController.deleteByPk);

export default artRouter;

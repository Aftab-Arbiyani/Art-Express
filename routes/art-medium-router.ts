import express from 'express';
import verifyToken from '../middleware/verifyToken';
import artMediumController from '../controllers/art-medium-controller';
import { artMedium } from '../middleware/upload-image';

const artMediumRouter = express.Router();

artMediumRouter.post('', verifyToken, artMedium.single('image'), artMediumController.create);
artMediumRouter.get('', artMediumController.findAndCountAll);
artMediumRouter.get('/:id', artMediumController.findByPk);
artMediumRouter.patch('/:id', verifyToken, artMedium.single('image'), artMediumController.updateByPk);
artMediumRouter.delete('/:id', verifyToken, artMediumController.deleteByPk);

export default artMediumRouter;

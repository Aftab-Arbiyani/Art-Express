import express from 'express';

import artImagesController from '../controllers/art-images-controller';

const artImagesRouter = express.Router();

artImagesRouter.post('', artImagesController.create);
artImagesRouter.get('', artImagesController.findAndCountAll);
artImagesRouter.get('/:id', artImagesController.findByPk);
artImagesRouter.patch('/:id', artImagesController.updateByPk);
artImagesRouter.delete('/:id', artImagesController.deleteByPk);

export default artImagesRouter;

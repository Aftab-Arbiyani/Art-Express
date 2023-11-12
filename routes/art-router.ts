import express from 'express';
import verifyToken from '../middleware/verifyToken';
import artController from '../controllers/art-controller';
import { artImageUpload } from '../middleware/upload-image';
import validationMiddleware from '../middleware/validation-middleware';
import { createArtValidation } from '../utils/validation/create/add-art-validation';
import { editArtValidation } from '../utils/validation/edit/edit-art-validation';

const artRouter = express.Router();

artRouter.post('', verifyToken, artImageUpload.array('images', 3), validationMiddleware(createArtValidation), artController.create);
artRouter.get('', artController.findAndCountAll);
artRouter.get('/:id', artController.findByPk);
artRouter.patch('/:id', verifyToken, artImageUpload.array('images', 3), validationMiddleware(editArtValidation), artController.updateByPk);
artRouter.delete('/:id', verifyToken, artController.deleteByPk);

export default artRouter;

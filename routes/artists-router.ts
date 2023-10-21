import express from 'express';
import verifyToken from '../middleware/verifyToken';
import artistsController from '../controllers/artists-controller';
import { profileImageUpload } from '../middleware/upload-image';
import validationMiddleware from '../middleware/validation-middleware';
import { artistEditSchema } from '../utils/validation/edit/artist-validation';

const artistsRouter = express.Router();

artistsRouter.post('', verifyToken, artistsController.create);
artistsRouter.get('', artistsController.findAndCountAll);
artistsRouter.get('/:id', verifyToken, artistsController.findByPk);
artistsRouter.patch('', verifyToken, profileImageUpload.single('profile_picture'), validationMiddleware(artistEditSchema), artistsController.editProfile);
artistsRouter.delete('/:id', verifyToken, artistsController.deleteByPk);

export default artistsRouter;

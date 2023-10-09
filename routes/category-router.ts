import express from 'express';

import categoryController from '../controllers/category-controller';
import { categoryImage } from '../middleware/upload-image';
import validationMiddleware from '../middleware/validation-middleware';
import { categoryCreateSchema } from '../utils/validation/create/category-validation';
import { categoryEditSchema } from '../utils/validation/edit/category-validation';

const categoryRouter = express.Router();

categoryRouter.post('', categoryImage.single('image'), validationMiddleware(categoryCreateSchema), categoryController.create);
categoryRouter.get('', categoryController.findAndCountAll);
categoryRouter.get('/:id', categoryController.findByPk);
categoryRouter.patch('/:id', categoryImage.single('image'), validationMiddleware(categoryEditSchema), categoryController.updateByPk);
categoryRouter.delete('/:id', categoryController.deleteByPk);

export default categoryRouter;

import express from 'express';
import authRouter from './auth-router';
import artistsRouter from './artists-router';
import commonRouter from './common-router';
import categoryRouter from './category-router';
import userAddressRouter from './user-address-router';
import userRouter from './user-router';
import artMediumRouter from './art-medium-router';
import artRouter from './art-router';
import artImagesRouter from './art-images-router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/artists', artistsRouter);
router.use('/common', commonRouter);
router.use('/category', categoryRouter);
router.use('/user-address', userAddressRouter);
router.use('/user', userRouter);
router.use('/art-medium', artMediumRouter);
router.use('/art', artRouter);
router.use('/art-images', artImagesRouter);

export default router;
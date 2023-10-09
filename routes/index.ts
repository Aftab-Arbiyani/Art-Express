import express from 'express';
import authRouter from './auth-router';
import artistsRouter from './artists-router';
import commonRouter from './common-router';
import categoryRouter from './category-router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/artists', artistsRouter);
router.use('/common', commonRouter);
router.use('/category', categoryRouter);

export default router;
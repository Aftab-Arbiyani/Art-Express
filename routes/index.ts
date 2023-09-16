import express from 'express';
import authRouter from './auth-router';
import artistsRouter from './artists-router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/artists', artistsRouter);

export default router;
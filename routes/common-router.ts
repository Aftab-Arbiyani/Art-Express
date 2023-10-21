import express from 'express';

import commonController from '../controllers/common-controller';
import validationMiddleware from '../middleware/validation-middleware';
import { verifyOtpSchema } from '../utils/validation/other/verify-otp-validation';

const modifyPayload = (table) => {
    return (req, res, next) => {
        req.body.table = table;
        next();
    };
};

const commonRouter = express.Router();

commonRouter.post('/user/verify-otp', validationMiddleware(verifyOtpSchema), modifyPayload('user'), commonController.verifyOtp);
commonRouter.post('/artist/verify-otp', validationMiddleware(verifyOtpSchema), modifyPayload('artist'), commonController.verifyOtp);

export default commonRouter;
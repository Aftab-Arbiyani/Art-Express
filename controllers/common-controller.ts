import dbService from "../utils/dbService";
import response from "../utils/response";

import userModel from "../models/user-model";
import otpModel from "../models/otp-model";
import artistsModel from "../models/artists-model";

const getModel = (table: string) => {
  switch (table) {
    case 'user':
      return ['fk_user', userModel];
    case 'artist':
      return ['artist', 'fk_artist', artistsModel];
  }
};

const verifyOtp = async (req, res, next) => {
  try {

    const { email, otp } = req.body;
    const [fk_table, model]: (string | any)[] = getModel(req.body.table);
    const modelData = await dbService.findOne(model, { email: email });

    if (!modelData) throw new Error('No record Found');

    switch (req.query.type) {
      case 'sign-up': {
        const data = { otp_type: 'sign_up', is_verified: false };
        Object.assign(data, { [fk_table]: modelData.id, otp: otp });

        // otp exist
        const storedOtp = await dbService.findOne(otpModel, data);
        if (storedOtp) {
          await dbService.updateByPk(otpModel, { is_verified: true }, storedOtp.id);
          await dbService.updateByPk(model, { is_verified: true }, modelData.id );
          response.successResponse(
            { message: 'Otp Verified', data: {} },
            res
          );
        } else {
          return response.failureResponse(
            { message: 'Invalid Input', data: {} },
            res
          );
        }
      }
        break;
      case 'forgot-password': {
        const data = { otp_type: 'forgot_password', is_verified: false };
        Object.assign(data, { [fk_table]: modelData.id, otp: otp });

        // otp exist
        const storedOtp = await dbService.findOne(otpModel, data);
        if (storedOtp) {
          await dbService.updateByPk(otpModel, { is_verified: true }, storedOtp.id);
          response.successResponse(
            { message: 'Otp Verified', data: {} },
            res
          );
        } else {
          return response.failureResponse(
            { message: 'Invalid Input', data: {} },
            res
          );
        }
      }
        break;
      default:
        return response.badRequest(
          { message: 'Otp type missing', data: {} },
          res
        );
    }

    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const commonController = {
  verifyOtp
};
export default commonController;
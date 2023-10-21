import dbService from "../utils/dbService";
import response from "../utils/response";

import userModel from "../models/user-model";
import { Model } from 'sequelize';
import fs from 'fs'

const findAndCountAll = async (req, res, next) => {
  try {
    const data = await dbService.findAndCountAll(userModel, req.query);
    response.successResponseWithPagination(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const findByPk = async (req, res, next) => {
  try {
    const data = await dbService.findByPk(userModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const editProfile = async (req, res, next) => {
  try {
    if (req.file) {
      Object.assign(req.body, { profile_picture: req.file.path });

      const attributes = {
        include: ['profile_picture']
      };
      // Remove Old Image
      const old: any = await dbService.findByPk(userModel, req.user.id, attributes);
      // Check if file exists
      if (old.data.profile_picture && fs.existsSync(old.data.profile_picture)) {
        fs.rmSync(old.data.profile_picture);
      }
    }
    const data = await dbService.updateByPk(userModel, req.body, req.user.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const deleteByPk = async (req, res, next) => {
  try {
    const data = await dbService.deleteByPk(userModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const userController = {
  findAndCountAll,
  findByPk,
  editProfile,
  deleteByPk,
};
export default userController;
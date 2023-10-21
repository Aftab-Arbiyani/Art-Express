import dbService from "../utils/dbService";
import response from "../utils/response";

import artistsModel from "../models/artists-model";
import fs from 'fs';

const create = async (req, res, next) => {
  try {
    const data = await dbService.create(artistsModel, req.body);
    response.successCreate(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const findAndCountAll = async (req, res, next) => {
  try {
    const data = await dbService.findAndCountAll(artistsModel, req.query);
    response.successResponseWithPagination(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const findByPk = async (req, res, next) => {
  try {
    const data = await dbService.findByPk(artistsModel, req.params.id);
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
      const old: any = await dbService.findByPk(artistsModel, req.user.id, attributes);
      // Check if file exists
      if (old.data.profile_picture && fs.existsSync(old.data.profile_picture)) {
        fs.rmSync(old.data.profile_picture);
      }
    }
    const data = await dbService.updateByPk(artistsModel, req.body, req.user.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const deleteByPk = async (req, res, next) => {
  try {
    const data = await dbService.deleteByPk(artistsModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const artistsController = {
  create,
  findAndCountAll,
  findByPk,
  editProfile,
  deleteByPk,
};
export default artistsController;
import dbService from "../utils/dbService";
import response from "../utils/response";

import artistsModel from "../models/artists-model";

const create = async (req, res, next) => {
  try {
    const data = await dbService.create(artistsModel, req.body);
    response.successCreate(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findAndCountAll = async (req, res, next) => {
  try {
    const data = await dbService.findAndCountAll(artistsModel, req.query);
    response.successResponseWithPagination(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findByPk = async (req, res, next) => {
  try {
    const data = await dbService.findByPk(artistsModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const updateByPk = async (req, res, next) => {
  try {
    const data = await dbService.updateByPk(artistsModel, req.body, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const deleteByPk = async (req, res, next) => {
  try {
    const data = await dbService.deleteByPk(artistsModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const artistsController = {
  create,
  findAndCountAll,
  findByPk,
  updateByPk,
  deleteByPk,
};
export default artistsController;
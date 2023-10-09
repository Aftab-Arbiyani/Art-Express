import dbService from "../utils/dbService";
import response from "../utils/response";

import categoryModel from "../models/category-model";

const create = async (req, res, next) => {
  try {
    if (req?.file) {
      req.body.image = req.file.path;
    }
    const data = await dbService.create(categoryModel, req.body);
    response.successCreate(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findAndCountAll = async (req, res, next) => {
  try {
    const data = await dbService.findAndCountAll(categoryModel, req.query);
    response.successResponseWithPagination(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findByPk = async (req, res, next) => {
  try {
    const data = await dbService.findByPk(categoryModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const updateByPk = async (req, res, next) => {
  try {
    const data = await dbService.updateByPk(categoryModel, req.body, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const deleteByPk = async (req, res, next) => {
  try {
    const data = await dbService.deleteByPk(categoryModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const categoryController = {
  create,
  findAndCountAll,
  findByPk,
  updateByPk,
  deleteByPk,
};
export default categoryController;
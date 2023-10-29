import dbService from "../utils/dbService";
import response from "../utils/response";
import fs from 'fs';

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
    return response.failureResponse(error, res);
  }
};

const findAndCountAll = async (req, res, next) => {
  try {
    const data = await dbService.findAndCountAll(categoryModel, req.query);
    response.successResponseWithPagination(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const findByPk = async (req, res, next) => {
  try {
    const data = await dbService.findByPk(categoryModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const updateByPk = async (req, res, next) => {
  try {
    if (req.file) {
      Object.assign(req.body, { image: req.file.path });

      const attributes = {
        include: ['image']
      };
      // Remove Old Image
      const old: any = await dbService.findByPk(categoryModel, req.params.id, attributes);
      // Check if file exists
      if (old.data.image && fs.existsSync(old.data.image)) {
        fs.rmSync(old.data.image);
      }
    }
    const data = await dbService.updateByPk(categoryModel, req.body, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const deleteByPk = async (req, res, next) => {
  try {
    const data = await dbService.deleteByPk(categoryModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
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
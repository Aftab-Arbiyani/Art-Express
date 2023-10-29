import dbService from "../utils/dbService";
import response from "../utils/response";
import fs from 'fs';

import artMediumModel from "../models/art-medium-model";

const create = async (req, res, next) => {
  try {
    if (req?.file) {
      req.body.image = req.file.path;
    }
    const data = await dbService.create(artMediumModel, req.body);
    response.successCreate(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findAndCountAll = async (req, res, next) => {
  try {
    const data = await dbService.findAndCountAll(artMediumModel, req.query);
    response.successResponseWithPagination(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findByPk = async (req, res, next) => {
  try {
    const data = await dbService.findByPk(artMediumModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
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
      const old: any = await dbService.findByPk(artMediumModel, req.params.id, attributes);
      // Check if file exists
      if (old.data.image && fs.existsSync(old.data.image)) {
        fs.rmSync(old.data.image);
      }
    }
    const data = await dbService.updateByPk(artMediumModel, req.body, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const deleteByPk = async (req, res, next) => {
  try {
    const data = await dbService.deleteByPk(artMediumModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const artMediumController = {
  create,
  findAndCountAll,
  findByPk,
  updateByPk,
  deleteByPk,
};
export default artMediumController;
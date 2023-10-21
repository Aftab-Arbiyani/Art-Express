import dbService from "../utils/dbService";
import response from "../utils/response";

import userAddressModel from "../models/user-address-model";

const create = async (req, res, next) => {
  try {
    const count = await userAddressModel.count({ where: { fk_user: req.user.id, deleted_at: null } });

    if (count === 3) {
      return response.successResponse({ data: {}, message: "You can add upto three addresses only" }, res);
    }
    Object.assign(req.body, { fk_user: req.user.id });
    const data = await dbService.create(userAddressModel, req.body);
    response.successCreate(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const findAndCountAll = async (req, res, next) => {
  try {
    const data = await dbService.findAndCountAll(userAddressModel, req.query);
    response.successResponseWithPagination(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const findByPk = async (req, res, next) => {
  try {
    const data = await dbService.findByPk(userAddressModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const updateByPk = async (req, res, next) => {
  try {
    const data = await dbService.updateByPk(userAddressModel, req.body, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const deleteByPk = async (req, res, next) => {
  try {
    const data = await dbService.deleteByPk(userAddressModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const userAddressController = {
  create,
  findAndCountAll,
  findByPk,
  updateByPk,
  deleteByPk,
};
export default userAddressController;
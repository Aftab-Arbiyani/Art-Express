import dbService from "../utils/dbService";
import response from "../utils/response";

import cartModel from "../models/cart-model";
import cartItemsModel from '../models/cart-items-model';

const addToCart = async (req, res, next) => {
  try {
    const userCart = await dbService.findOne(cartModel, { fk_user: req.user.id });

    if (!userCart) {
      throw new Error('No record found.');
    }

    Object.assign(req.body, { fk_cart: userCart.dataValues.id})
    const data = await dbService.create(cartItemsModel, req.body);
    response.successCreate(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findAndCountAll = async (req, res, next) => {
  try {
    const data = await dbService.findAndCountAll(cartModel, req.query);
    response.successResponseWithPagination(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findByPk = async (req, res, next) => {
  try {
    const data = await dbService.findByPk(cartModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const updateByPk = async (req, res, next) => {
  try {
    const data = await dbService.updateByPk(cartModel, req.body, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const removeCartItems = async (req, res, next) => {
  try {
    const data = await dbService.deleteByPk(cartItemsModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const cartController = {
  addToCart,
  findAndCountAll,
  findByPk,
  updateByPk,
  removeCartItems,
};
export default cartController;
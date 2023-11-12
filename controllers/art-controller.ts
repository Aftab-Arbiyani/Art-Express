import dbService from "../utils/dbService";
import response from "../utils/response";

import artModel from "../models/art-model";
import artImagesModel from "../models/art-images-model";
import fs from 'fs';


const create = async (req, res, next) => {
  try {
    req.body.fk_artist = req.user.id
    const data = await dbService.create(artModel, req.body);

    if (req?.files) {
      const artImages = [];
      let count = 0;
      req.files.forEach(image => {
        artImages.push({
          fk_art: data.dataValues.id,
          file_name: image.originalname,
          image: image.path,
          image_type: ((count === 0) ? 'cover' : 'gallery')
        });

        count++;
      });

      await dbService.bulkCreate(artImagesModel, artImages);
    }
    response.successCreate(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findAndCountAll = async (req, res, next) => {
  try {
    const data = await dbService.findAndCountAll(artModel, req.query);
    response.successResponseWithPagination(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const findByPk = async (req, res, next) => {
  try {
    const data = await dbService.findByPk(artModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const updateByPk = async (req, res, next) => {
  try {
    const art = await dbService.findOne(artModel, { id: req.params.id, fk_artist: req.user.id });

    if (!art) {
      throw new Error("No record found.");
    }

    if (req?.files) {
      const artImages = [];
      let count = 0;
      req.files.forEach(image => {
        artImages.push({
          fk_art: art.dataValues.id,
          file_name: image.originalname,
          image: image.path,
          image_type: ((count === 0) ? 'cover' : 'gallery')
        });

        count++;
      });

      await dbService.bulkCreate(artImagesModel, artImages);
    }

    if (req?.body?.removed_image) {
      req.body.removed_image.forEach(async (id: string) => {
        const old: any = await dbService.findByPk(artImagesModel, id, { include: ['image'] });
        // Check if file exists
        if (old.data.image && fs.existsSync(old.data.image)) {
          fs.rmSync(old.data.image);
        }
        await dbService.deleteByPk(artImagesModel, id);
      });
      delete req.body.removed_image;
    }

    const data = await dbService.updateByPk(artModel, req.body, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const deleteByPk = async (req, res, next) => {
  try {
    const data = await dbService.deleteByPk(artModel, req.params.id);
    response.successResponse(data, res);
    next();
  } catch (error) {
    response.failureResponse(error, res);
    next();
  }
};

const artController = {
  create,
  findAndCountAll,
  findByPk,
  updateByPk,
  deleteByPk,
};
export default artController;
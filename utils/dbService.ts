// for create one as well as create many
const create = (model, data) => model.create(data);

// update single document that will return updated document
const updateOne = (model, filter, data, options = { new: true }) =>
  model.findOneAndUpdate(filter, data, options);

const updateByPk = async (model, data, id) => {
  const result = await model.update(data, { where: { id: id } });
  if (result[0] === 1) {
    const data = await findByPk(model, id);
    return {
      message: "Record Updated Successfully.",
      data: data.data,
    };
  }
  return {
    message: "Record Not Found.",
    data: {},
  };
};

const deleteByPk = async (model, id) => {
  const data = await model.findByPk(id);
  if(data === null || data.deletedAt !== null) {
    return {
      message: "Record Not Found.",
      data: {},
    };
  }
  const result = await model.update({ deletedAt: new Date()},{ where: { id: id } });
  if (result[0] === 1) {
    return {
      message: "Record Deleted Successfully.",
      data: {}
    };
  }
};

// delete single document that will return updated document
const deleteOne = (model, filter, options = { new: true }) =>
  model.findOneAndDelete(filter, options);

// update multiple documents and returns count
const updateMany = (model, filter, data) => model.updateMany(filter, data);

// delete multiple documents and returns count
const deleteMany = (model, filter) => model.deleteMany(filter);

// find single document by query
const findOne = (model, where) => model.findOne({ where: { ...where, deletedAt: null } });

// find single document by query
const findByPk = async (model, id) => {
  const result = await model.findOne({where : { id: id, deletedAt: null}});
  if (result === null) {
    return {
      message: "Record Not Found",
      data: {},
    };
  }
  return {
    message: "Record Found",
    data: result.dataValues,
  };
};

// find multiple documents
const findAll = (model, where = {}, options = {}) =>
  model.findAll({ ...where, deletedAt: null }, options);

// find multiple documents
const findAndCountAll = async (model, query) => {
  let { limit, skip, order, select, ...where } = query;
  limit = limit ? parseInt(limit) : 10;
  skip = skip ? parseInt(skip) : 0;
  order = order ? [JSON.parse(order)] : [["createdAt", "ASC"]];
  select = select ? JSON.parse(select) : [];
  where = {
    ...where,
    deletedAt: null,
  };
  const sequelizeOptions = {
    where,
    limit,
    offset: skip,
    order,
  };
  if (select.length) {
    Object.assign(sequelizeOptions, { attributes: select });
  }

  const { count, rows } = await model.findAndCountAll(sequelizeOptions);
  const data = {
    message: count > 0 ? "Records found." : "Records Not found.",
    total: count,
    limit: limit,
    skip: skip,
    data: rows,
  };
  return data;
};

const findOrCreate = async (model, where, defaults) => {
  const [record, created] = await model.findOrCreate({ where: { ...where, deletedAt: null }, defaults: defaults });
  return [record, !created];
}

// count documents
const count = (model, filter) => model.countDocuments(filter);

// find documents with pagination
const paginate = (model, filter, options) => model.find(filter, options);

const dbService = {
  create,
  updateOne,
  updateByPk,
  updateMany,
  deleteOne,
  deleteMany,
  deleteByPk,
  findOne,
  findByPk,
  findAll,
  findAndCountAll,
  findOrCreate,
  count,
  paginate,
};

export default dbService;

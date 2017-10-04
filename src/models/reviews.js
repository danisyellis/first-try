const db = require('./db/users');

const create = (content, userId, albumId) => {
  return db.create(content, userId, albumId);
};

const findById = (id) => {
  return db.findById(id);
};

module.exports = {
  create,
  findById,
};

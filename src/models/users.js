const db = require('./db/users');

const create = (name, email, password) => {
  return db.create(name, email, password);
};

const findByEmail = (email) => {
  return db.findByEmail(email);
};

const findById = (id) => {
  return db.findById(id);
};

module.exports = {
  create,
  findByEmail,
  findById,
};

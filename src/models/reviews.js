const db = require('./db/reviews');

const create = (content, userId, albumId) => {
  return db.create(content, userId, albumId);
};

const findById = (id) => {
  return db.findById(id);
};

const findByAlbum = (id) => {
  return db.findByAlbum(id);
};

const findByUser = (id) => {
  return db.findByUser(id);
};

const find3MostRecent = function() {
  return db.find3MostRecent();
}

module.exports = {
  create,
  findById,
  findByAlbum,
  findByUser,
  find3MostRecent
};

const {db} = require('./index.js')

const create = (content, userId, albumId) => {
  return db.oneOrNone(`
    INSERT INTO
      reviews (content, user_id, album_id)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
    `,
    [content, userId, albumId])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const findById = (id) => {
  return db.oneOrNone(`
    SELECT
      *
    FROM
      reviews
    WHERE id=$1
    `, id)
    .catch(error => {
      console.error(error.message);
      throw error;
    });
  };

module.exports = {
  create,
  findById
};

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
    [
      content,
      userId,
      albumId
    ])
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

  const findByUser = (userId) => {
    return db.any(`
      SELECT
        *
      FROM
        reviews
      WHERE reviews.user_id=$1
      ORDER BY reviews.id DESC
      `, userId)
      .catch(error => {
        console.error(error.message);
        throw error;
      });
    };

    const findByAlbum = (albumId) => {
      return db.any(`
        SELECT * FROM reviews
        WHERE reviews.album_id = $1
        ORDER BY reviews.id DESC
      `, albumId)
      .catch(error => {
        console.error(error.message);
        throw error;
      });
    };

    const find3MostRecent = function() {
      return db.any(`
        SELECT * FROM reviews
        ORDER BY reviews.id DESC
        LIMIT 3
      `)
    }

module.exports = {
  create,
  findById,
  findByUser,
  findByAlbum,
  find3MostRecent
};

const {db} = require('./index.js')

const create = (name, email, password) => {
  return db.oneOrNone(`
    INSERT INTO
      users (name, email, password)
    VALUES
      ($1, $2, $3)
    RETURNING
      *
    `,
    [
      name,
      email,
      password,
    ])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const findByEmail = (email) => {
  return db.oneOrNone(`
    SELECT
      *
    FROM
      users
    WHERE email=$1
    `, email)
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
      users
    WHERE id=$1
    `, id)
    .catch(error => {
      console.error(error.message);
      throw error;
    });
  };

module.exports = {
  create,
  findByEmail,
  findById
};

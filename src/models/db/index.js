const pgp = require('pg-promise')();
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);
console.log(db, "in  index");
//check to see if we can connect to the db. If not, catch an error
db.connect()
    .then(obj => {
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

const getAlbums = () => {
  return db.many('SELECT * FROM albums')
  .catch(error => {console.log(error, "is the error");})
}

function getAlbumByID(albumID) {
  return db.oneOrNone('SELECT * FROM albums WHERE id = $1', [albumID])
}

module.exports = {
  getAlbums,
  getAlbumByID,
  db
}

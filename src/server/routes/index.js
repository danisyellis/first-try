const router = require('express').Router();
const db = require('../../models/db');
const auth = require('./auth');
const albums = require('./albums');
const users = require('./users');

router.get('/', (req, res) => {
  db.getAlbums((error, albums) => {
    if (error) {
      res.status(500).render('common/error', {error})
    } else {
      res.render('index', {albums})
    }
  })
})

router.use('/', auth);
router.use('/albums', albums);
router.use('/users', users);


module.exports = router;

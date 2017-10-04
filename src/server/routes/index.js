const router = require('express').Router();
const db = require('../../models/db');
const auth = require('./auth');
const albums = require('./albums');
const users = require('./users');
const {isLoggedIn} = require('../utils');

router.get('/', (req, res) => {
  db.getAlbums(albums)
  .then(albums => {
    res.render('index', {albums})
  })
  .catch(error => {
    res.status(500).render('common/error', {error})
  })
})

router.use('/', auth);
router.use(isLoggedIn);
router.use('/albums', albums);
router.use('/users', users);


module.exports = router;

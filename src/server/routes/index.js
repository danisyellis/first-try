const router = require('express').Router();
const db = require('../../models/db');
const reviewsDb = require('../../models/reviews')
const auth = require('./auth');
const albums = require('./albums');
const users = require('./users');
const reviews = require('./reviews');
const {isLoggedIn} = require('../utils');

router.get('/', (req, res) => {
  if(req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
  }
  reviewsDb.find3MostRecent()
  .then(reviews => {
    db.getAlbums(albums)
    .then(albums => {
      res.render('index', {albums, reviews})
    })  
  })
  .catch(error => {
    res.status(500).render('common/error', {error})
  })
})

router.use('/', auth);
router.use('/albums', albums);
router.use(isLoggedIn);
router.use('/users', users);
router.use('/', reviews);


module.exports = router;

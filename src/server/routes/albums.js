const db = require('../../models/db');
const router = require('express').Router();
const reviewDb = require('../../models/db/reviews');

router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID
  if(req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
  }
  db.getAlbumByID(albumID)
  .then(album => {
    console.log("This is the album", album);
    reviewDb.findByAlbum(albumID)
    .then(reviews => {
      console.log("These are the reviews", reviews);
      res.render('album', {album, reviews})
    })
  })
  .catch(error => {
    res.status(500).render('common/error', {error})
  })
})

module.exports = router;

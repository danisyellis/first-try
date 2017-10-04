const db = require('../../models/db');
const router = require('express').Router();

router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  db.getAlbumByID(albumID)
  .then(album => {
    res.render('album', {album})
  })
  .catch(error => {
    res.status(500).render('common/error', {error})
  })
})

module.exports = router;

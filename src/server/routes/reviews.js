const router = require('express').Router();
const Reviews = require('../../models/reviews');
const db = require('../../models/db/index.js');

router.get('/albums/:id/reviews/new', (request, response) => {
  const albumId= request.params.id;
  db.getAlbumByID(albumId)
  .then(album => {
    response.render('newReview', {album})
  })
  .catch(error => {
    res.status(500).render('common/error', {error})
  })
})

router.post('/albums/:id/reviews/new', (request, response) => {
  const albumId = request.params.id;
  // if(!request.body.newReview) {
  //   response.redirect(`/albums/${albumId}/reviews/new`);
  // }
  // else {
    const review = request.body.newReview
    const userId = response.locals.user.id
    Reviews.create(review, userId, albumId)
    .then((review) => {
      response.redirect(`/albums/${albumId}`)
    })
    .catch(error => {
      response.status(500).render('common/error', {error})
    })
  //}
});

router.delete('/albums/:id/reviews/:id', (request, response) => {

})

module.exports = router;

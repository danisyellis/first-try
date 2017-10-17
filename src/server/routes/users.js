const router = require('express').Router();
const Users = require('../../models/users');
const Reviews = require('../../models/reviews');

router.get('/:id', (request, response) => {
  const id=request.params.id;
  Reviews.findByUser(id)
  .then(reviews => {
    Users.findById(id)
    .then(user => {
      user.date_joined = user.date_joined.toDateString();
      response.render('users/show', {user, reviews})
    })
  })
})

module.exports = router;

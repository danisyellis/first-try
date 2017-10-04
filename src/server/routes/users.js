const router = require('express').Router();
const Users = require('../../models/users');

router.get('/:id', (request, response) => {
  const id=request.params.id;
  Users.findById(id)
  .then(user => {
    user.date_joined = user.date_joined.toDateString();
    response.render('users/show', {user})
  })
})

module.exports = router;

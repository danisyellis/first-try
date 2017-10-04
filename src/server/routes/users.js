const router = require('express').Router();
const db = require('../../models/db');
const Users = require('../../models/users');

router.get('/:id', (request, response) => {
  const id=request.params.id;
  Users.findById(id)
  .then(user => {
    response.render('users/show', {user})
  })
})

module.exports = router;

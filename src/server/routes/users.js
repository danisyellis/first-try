const router = require('express').Router();
const db = require('../../models/db');

router.get('/:id', (request, response) => {
  const id=req.params.id;
  User.findById(id)
  .then(user => {
    res.render('users/show', {user})
  })
})

module.exports = router;

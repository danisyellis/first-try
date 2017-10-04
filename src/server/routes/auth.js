const router = require('express').Router();
const { encryptPassword, comparePasswords, createSession } = require('../utils');
const Users = require('../../models/users');


router.get('/signup', (request, response) => {
  let message;
  if(request.session.user) {
    const id = request.session.user.id;
    response.redirect(`/users/${id}`);
  }
  response.render('auth/signup', {message});
});

router.post('/signup', (request, response) => {
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;
  encryptPassword(password)
  .then(hashedPassword => {
    Users.create(name, email, hashedPassword)
    .then(newUser => {
     createSession(request, response, newUser);
     const id = newUser.id;
     request.session.save(function(err) {
       response.redirect(`/users/${newUser.id}`);
     });
   })
   .catch(error => {
     let message = 'That username already exists. Please choose another.'
     response.render('auth/signup', {message});
   });
 }).catch(error => {
   console.log(error, "could not create user")
 })
});

router.get('/login', (request, response) => {
  if(request.session.user) {
    const id = request.session.user.id;
    response.redirect(`/users/${id}`);
  }
    let message;
    response.render('auth/login', {message});
  }
);

router.post('/login', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  Users.findByEmail(email)
  .then(user => {
    comparePasswords(password, user.password)
    .then(passwordsMatch => {
      if(passwordsMatch) {
        createSession(request, response, user);
        request.session.save(function(err) {
          response.redirect(`/users/${user.id}`);
        });
      } else {
        let message = "username and password don't match";
        response.render('auth/login', {message});
      }
    });
  })
  .catch(error => {
    let message = 'Incorrect username or password'
    response.render('auth/login', {message});
  });
});

module.exports = router;

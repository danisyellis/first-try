const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const comparePasswords = (passwordEntered, hashedPassword) => {
  return bcrypt.compare(passwordEntered, hashedPassword);
};

const createSession = (request, response, user) => {
  request.session.user = user;
};

const isLoggedIn = (request, response, next) => {
  if(!request.session.user) {
    response.redirect('/login');
  } else {
    response.locals.isLoggedIn = true;
    next();
  }
};


module.exports = {
  encryptPassword,
  comparePasswords,
  createSession,
  isLoggedIn
};

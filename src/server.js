const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
require('dotenv').config();
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);


const port = process.env.PORT

const app = express()

app.use(morgan('dev'));

require('ejs')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use((request, response, next) => {
  //response.locals.query = '';  only need this if I implement search using the variable query
  response.locals.isLoggedIn = false;
  next()
});

app.use(session({
  store: new pgSession({
    conString: process.env.DATABASE_URL
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1 * 24 * 60 * 60 * 1000}
}));

app.use('/', routes);

app.use((req, res) => {
  res.status(404).render('common/not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})

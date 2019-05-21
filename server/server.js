// Create your expressjs server here.
const express = require('express');
const cors = require('cors');
const {
  UserNotFound,
  UserAlreadyExists,
  PasswordIncorrect,
  ValidationError,
  UserIsLocked
} = require(`./errors/errors.js`);
const passport = require('passport');

const app = express();
app.use(cors());
app.use(passport.initialize());
require('./middlewares/passport')(passport);
const http = require('http').Server(app);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', require('./routes/users.js'));
app.use('/organizations', require('./routes/organizations.js'));

app.use(function (err, req, res, next) {
  let status = 500;
  switch (true) {
    case err instanceof UserNotFound :
      status = 404;
      break;
    case err instanceof UserAlreadyExists :
      status = 409;
      break;
    case err instanceof PasswordIncorrect :
      status = 401;
      break;
    case err instanceof ValidationError :
      status = 400;
      break;
    case err instanceof UserIsLocked :
      status = 423;
  }
  res.status(status).send(err.message);
})

http.listen(3030, function() {
  console.log('server is up and running...');
})

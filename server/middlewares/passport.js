const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';
// const mongoose = require('mongoose');
const path = process.cwd();
const User = require(`${path}/schemas/users.js`);
const options = {
  secretOrKey: JWT_SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

module.exports = (passport) => {
  passport.use(new jwtStrategy(
    options,
    async (payload, done) => {
      const user = await User.findById(payload._id).select("_id email");

      if (user) {
        done(null, payload);
      } else {
        done(null, false);
      }

    }
  ));
};
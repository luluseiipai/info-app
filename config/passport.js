/* jshint esversion: 6 */
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const key = require('../config/keys').secretOrKey;
const mongoose = require('mongoose');
const USER = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
  passport.use(new JwtStrategy(opts,function(jwt_payload, done){
    USER.findById(jwt_payload.id)
      .then(user => {
        if(user) return done(null, user);
        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
};
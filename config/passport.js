const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
const config =require('../config/database');


module.exports = function(passport){
  let opts = {};//create options
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');//passing the token back and forth using the auth header
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if(err){
        return done(err, false);//if err, return the err and return false for the user being found
      }

      if(user){
        return done(null, user);//if user was found set null for the error and pass the user along
      } else {
        return done(null, false);
      }
    });
  }));
}

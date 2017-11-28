var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

module.exports = function(passport) {

    passport.serializeUser((user, done) => {
      done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackUrl
    },
    function(token, refreshToken, profile, done) {
        return done(null, profile);
    }
    
    
    
    ));
    
    
};
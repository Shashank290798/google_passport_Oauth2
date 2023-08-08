const passport = require('passport')

// this is the important code for passport setup and Google OAuth2 strategy setup
passport.serializeUser((user , done) => {
    done(null , user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

const GoogleStrategy = require('passport-google-oauth2').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CLIENT_URL,
    passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
    // verify the user's profile and authentication details
    console.log(profile)
    return done(null, profile);
}));
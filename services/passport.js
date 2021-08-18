const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done)=> {
    done(null, user.id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id)
    .then(user => {
        done(null, user);
    })

});

passport.use(new GoogleStratergy({
    clientID : keys.googleClientID,
    clientSecret : keys.googleClientSecret,
    callbackURL : "/auth/google/callback",
    proxy : true
}, async (accessToken, refreshToken, profile, done) => {
   const existingUser =  await  User.findOne({googleId: profile.id })  
    if (existingUser) {
        // User is already signed up
        done(null, existingUser);
    } else {
        const user =  await  new User({googleId : profile.id, firstName : profile.name.givenName, secondName : profile.name.familyName }).save()
        done(null, user);

    }

    console.log('access token',accessToken);
    console.log('refresh token',refreshToken);
    console.log('profile: ', profile);
} 
));


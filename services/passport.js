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
    callbackURL : "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id })
    .then((existingUser)=> {
        if (existingUser) {
            // User is already signed up
            done(null, existingUser);
        } else {
            new User({googleId : profile.id, firstName : profile.name.givenName, secondName : profile.name.familyName }).save()
            .then(user => done(null, user));

        }
    })

    

    console.log('access token',accessToken);
    console.log('refresh token',refreshToken);
    console.log('profile: ', profile);
} 
));

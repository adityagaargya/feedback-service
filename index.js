const express = require('express');
require('./models/User');
require('./services/passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');


const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 *1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, {useNewUrlParser:true, useUnifiedTopology:true});

require('./routes/authRoutes')(app);



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log("Server started ...");
});
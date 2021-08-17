const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId : String,
    firstName : String,
    secondName : String

});

mongoose.model('User', userSchema);
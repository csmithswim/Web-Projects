const Mongoose = require('mongoose');

const User = new Mongoose.Schema({

    email: {
        required: true,
        type: String,
        unique: true,
    },
    username: {
        required: true,
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 33
    },
    password: {
        required: true,
        type: String, 
        minlength: 7,
        maxlength: 100,
    }
})

module.exports = Mongoose.model('user', User);
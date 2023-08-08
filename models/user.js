const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
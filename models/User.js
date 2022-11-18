const mongoose = require('mongoose');

// email validator
const validEmail = (email) => {
    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailRegex.test(email);
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: validEmail,
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// does mongoose need to be defined before model? come back to this
const User = mongoose.model('User', userSchema);

module.exports = User;
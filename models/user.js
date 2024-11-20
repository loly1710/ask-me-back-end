const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    email: { 
        type: String, 
        unique: true, 
        required: true, 
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
            'Please enter a valid email address'
        ]
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female'], 
        required: true 
    },
    dateOfBirth: { type: Date, required: true }, 
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose')

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fName: {
        type: String, 
        required: true
    },
    lName: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    city: {
        type: String, 
        required: true
    },
    state: {
        type: String, 
        required: true
    },
    zip: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);
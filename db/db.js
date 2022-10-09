const mongoose = require('mongoose');
const { findOne } = require("../api/models/user")
const dotenv = require("dotenv");
dotenv.config();

const connect = async () => {
    await mongoose.connect(process.env.mongoDBURL)
}

const findUser = async (obj) => {
    await findOne(obj).exec()
}
//User.findOne({ email: req.body.email}).exec()

const saveUser = async (user) => {
    await user.save()
    return user
}

const disconnect = async () => {
    await mongoose.connection.close(process.env.mongoDBURL)
}


module.exports = {connect, findUser, saveUser, disconnect}


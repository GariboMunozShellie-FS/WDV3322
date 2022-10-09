const mongoose = require('mongoose');
const { findOne } = require('../../api/models/user')
const dotenv = require("dotenv");
dotenv.config();

const connect = async () => {
    console.log("Mocked Connected")
    await mongoose.connect(process.env.mongoDBURL)
}

const findUser = async (obj) => {
    console.log("Mocked Find User")
    await findOne(obj).exec()
}
//User.findOne({ email: req.body.email}).exec()

const saveUser = async (user) => {
    console.log("Mocked Saved User")
    await user.save()
    return user
}

const disconnect = async () => {
    console.log("Mocked Disonnected")
    await mongoose.connection.close(process.env.mongoDBURL)
}


module.exports = {connect, findUser, saveUser, disconnect}


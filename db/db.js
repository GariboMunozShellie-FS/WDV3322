const mongoose = require('mongoose');
const { findOne } = require("../api/models/user")

const connect = async () => {
    await mongoose.connect()
}

const findUser = async (obj) => {
    await findOne(obj).exec()
}

const saveUser = async (user) => {
    await user.save()
}

const disconnect = async () => {
    await mongoose.connection.close()
}

module.exports = {connect, findUser, saveUser, disconnect}
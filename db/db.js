const mongoose = require('mongoose');
const { User, findOne } = require("../api/models/user")

const connect = async () => {
    await mongoose.connect()
}

const findUser = async (obj) => {
    await findOne(obj).exec()
    return obj
}

const saveUser = async (user) => {
    await user.save()
    return user
}

const disconnect = async () => {
    await mongoose.connection.close()
}

module.exports = {connect, findUser, saveUser, disconnect}
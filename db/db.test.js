const mongoose = require('mongoose');
const User = require("../api/models/user")
const {connect, findUser, saveUser,  disconnect} = require("../db/db");
jest.mock('../db/db')

beforeAll(async () => {      
    await connect()
})

describe("New User", () => {
    test('Save User', async () => {
        const user = new User({
            firstName: "Arama",
            lastName: "Munoz",
            address:"Main ST",
            city:"Portland",
            state:"OR",
            zip:"00000",
            email: "amaramunoz@gmail.com",
            password: "password"
        })
        saveUser(user)
        expect(user.firstName).toEqual("Arama");
        expect(user.lastName).toEqual("Munoz");
    });
    
    test('Find User', async () => {
        findUser({email : "amaramunoz@gmail.com"})
        expect(User.firstName).toEqual("Arama");
        expect(User.lastName).toEqual("Munoz");
    });
    
})

afterAll( async () => {
    await disconnect()
})
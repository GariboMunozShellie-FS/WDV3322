const mongoose = require('mongoose');
const User = require("../api/models/user")
const { connect, findUser, saveUser, disconnect } = require("../../db/db");

beforeEach( async () => {
    connect()
})

describe("Receive random objects Test", () => {
    test('Save User', async () => {
        const user = new User({
            fName: "Arama",
            lName: "Munoz",
            address:"Main ST",
            city:"Portland",
            state:"OR",
            zip:"00000",
            email: "amaramunoz@gmail.com",
            password: "password"
        })

        expect(result.fName).toEqual("Arama");
        expect(result.lName).toEqual("Munoz");
    });

    test('I should receive ramdom categories', async () => {
        
        
        expect(result.fName).toEqual("Arama");
        expect(result.lName).toEqual("Munoz");
    })
})

afterEach( async () => {
    disconnect()
})
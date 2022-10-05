const express = require("express");
const User = require("../models/user")
const router = express.Router();
const bcrypt = require('bcrypt')

const user = []

router.post('/signup', (req, res) => {

    bcrypt.hash(req.body.password, 10,(err, hash) => {
        if (err){
            res.status(500).json({
                message: err.message,
            })
        }
            else{
                user.password = hash;
                res.status(200).json({
                    password: hash,
                })
            }
    })
})

router.post('/login', (req, res) => {
    bcrypt.compare(req.body.password, user.password,(err, result) => {
        if (err){
            res.status(501).json({
                message: err.message,
            })
        }
        if (result){
            res.status(200).json({
                    message: 'Authorization Successful',
                    result: result,
                })
        }
            else{
                res.status(401).json({
                    message: 'Authorization Failed',
                    result: result,
                })
            }
    })
})

router.get('/profile', (req, res) => {
    res.status(200).json({
        message: "/profile - GET",
    })
})

module.exports = router
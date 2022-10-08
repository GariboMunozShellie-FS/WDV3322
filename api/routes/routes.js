const express = require("express");
const User = require("../models/user")
const router = express.Router();
const bcrypt = require('bcrypt');
const { findUser, saveUser } = require("../../db/db");


router.post('/signup', (req, res) => {
    User.findOne({
        email: req.body.email,
    })
    .exec()
    .then(result => {
        //console.log("console log", result);
            if (result){
                return res.status(500).json({
                    message: 'Email is already taken. Please use a new email for your account',
                })
            }
        bcrypt.hash(req.body.password, 10,(err, hash) => {
            if (err){
                res.status(500).json({
                    message: err.message,
                })
            }
            else{
                const newUser = new User({
                    fName:req.body.fName,
                    lName:req.body.lName,
                    address:req.body.address,
                    city:req.body.city,
                    state:req.body.state,
                    zip:req.body.zip,
                    email: req.body.email,
                    password: hash
                })
                newUser.save()
                //saveUser(newUser)
                .then(result => {
                    console.log("console.Log", result);
                    res.status(200).json({
                        message: "New User has been added",
                        User:{
                            first_Name: result.fName,
                            last_Name: result.lName,
                            address: result.address,
                            city: result.city,
                            state: result.state,
                            zip: result.zip,
                            email: result.email,
                            password: hash,
                            metadata: {
                                host: req.hostname,
                                method: req.method
                            }
                        }
                    })
                })
                .catch(err =>{
                    console.error(err.message);
                    res.status(500).json({
                        error: {
                            message: err.message,
                        }
                    })
                })
            }
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            error: {
                message: "Unable to Save User information"
            }
        })
    })
})

router.post('/login', (req, res) => {
    User.findUser(req.body.email)
    .then(result => {
        console.log("Console" + result + "log");
        bcrypt.compare(req.body.password, result.password,(err, result) => {
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
    .catch(err => {
        console.error(err);
        res.status(500).json({
            error: {
                message: "Something went wrong, please try again"
            }
        })
    })
    
    
})

router.get('/profile', (req, res) => {
    res.status(200).json({
        message: "/profile - GET",
    })
})

module.exports = router
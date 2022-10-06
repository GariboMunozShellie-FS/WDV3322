const express = require("express");
const User = require("../models/user")
const router = express.Router();
const bcrypt = require('bcrypt')


router.post('/signup', (req, res) => {
    User.findOne({
        email: req.body.email,
    })
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0){
            return res.status(406).json({
                message: "Email is taken, please use a new email address"
            })
        }
        bcrypt.hash(req.body.password, 10,(err, hash) => {
            if (err){
                res.status(500).json({
                    message: err.message,
                })
            }
            else{
                const saveUser = new User({
                    fName:req.body.fName,
                    lName:req.body.lName,
                    address:req.body.address,
                    city:req.body.city,
                    state:req.body.state,
                    zip:req.body.zip,
                    email: req.body.email,
                    password: req.body.password
                })
                saveUser.save()
                .then(result => {
                    console.log(result);
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
    User.findOne({
        email: req.body.email,
    })
    .exec()
    .then(result => {
        console.log(result, req.body.email);
        bcrypt.compare(req.body.password, User.password,(err, result) => {
            if (err){
                res.status(501).json({
                    message: err.message,
                    Error: 'You are getting this error',
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
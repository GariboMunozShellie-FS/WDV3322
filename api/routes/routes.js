const express = require("express");
const User = require("../models/user")
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { findUser, saveUser } = require("../../db/db");
const checkAuth = require("../../auth/checkAuth");


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
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
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
                    console.log( result);
                    res.status(200).json({
                        message: "New User has been added",
                        User:{
                            first_Name: result.firstName,
                            last_Name: result.lastName,
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
//---------------------------------------------------------------
    const email = result.email
    const firstName = result.firstName
    const password = result.password
        console.log("Console" , result.firstName , "log");
//---------------------------------------------------------------
        bcrypt.compare(req.body.password, password,(err, result) => {
            if (err){
                res.status(501).json({
                    message: err.message,
                })
            }
            if (result){
                const token = jwt.sign(
                    {email: email, 
                    first_Name: firstName}, 
                    process.env.jwt_key);
                res.status(200).json({
                    message: 'Secured', 
                    name: firstName,
                    token: token,
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
                message: "Something has went wrong, please try again"
            }
        })
    })
    
    
})

router.get('/profile', checkAuth, (req, res, next) => {
    res.status(200).json({ 
        message: req.userData})
})


module.exports = router
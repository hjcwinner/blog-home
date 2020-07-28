const express = require('express')
const router = express.Router()
const userModel = require('../model/user')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const user = require('../model/user')

// register
// @route   POST http://localhost:8080/user/register
// @desc    Register user  
// @access  Public
//저장양식 => password암호화 => email중복확인 => 회원가입완료
router.post('/register', (req, res) => {
    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if(user)
            {
                return res.json({
                    message : "alreadyed email"
                })
            }
            else
            {
                //avatar생성
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err)
                    {
                        return res.json({
                            message : err.message
                        })
                    }
                    else
                    {
                        const newUser = new userModel({
                            name : req.body.name,
                            email : req.body.email,
                            password : hash,
                            avatar : avatar
                        })
                    
                        newUser
                            .save()
                            .then(doc => {
                                res.json({
                                    id : doc._id,
                                    name : doc.name,
                                    email : doc.email,
                                    password : doc.password,
                                    avatar : doc.avatar
                                })
                            })
                            .catch(err => {
                                res.json({
                                    message : err.message
                                })
                            }) 
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message : err.message
            })
        })
})


// login
// @route   POST http://localhost:8080/user/login
// @desc    Login user / return jwt
// @access  Public


// current
// @route   GET http://localhost:8080/user/current
// @desc    get current user from jwt
// @access  Private

module.exports = router
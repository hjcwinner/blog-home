const express = require('express')
const router = express.Router()
const passport = require('passport')
const { validationResult } = require('express-validator')

const postModel = require('../model/post')

const checkAuth = passport.authenticate('jwt', { session : false })

const {
    validPost
} = require('../helper/validation')
const post = require('../model/post')
const profile = require('../model/profile')



// @route   Url http://localhost:8080/post
// @desc    Post register from user post
// @access  private
router.post('/', checkAuth, validPost, (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json(errors)
    }
    else
    {
        const newPost = new postModel({
            user : req.user.id,
            text : req.body.text,
            name : req.user.name,
            avatar : req.user.avatar
        })
        newPost
            .save()
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err => {
                res.status(400).json({
                    message : err.message
                })
            })
    }
    
})

// @route   Url http://localhost:8080/post/total
// @desc    Total from user post
// @access  public
router.get('/total', (req, res) => {
    postModel
        .find()
        .then(post => {
            res.status(200).json({
                counts : post.length,
                postInfo : post
            })
        })
        .catch(err => {
            res.status(400).json({
                message : err.message
            })
        })
})

// @route   Url http://localhost:8080/post/:postid
// @desc    Delete from user post
// @access  public
router.delete('/:postid', checkAuth, (req, res) => {
    postModel
        .findById(req.params.postid)
        .then(post => {
            if(post.user.toString() !== req.user.id) {
                return res.status(200).json({
                    message : "No authrized"
                })
            }
            else
            {
                postModel
                    .findByIdAndDelete(req.params.postid)
                    .then(() => {
                        res.status(200).json({
                            message : "Post delete"
                        })
                    })
                    .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => {
            res.status(400).json({
                message : err.message
            })
        })
})

// @route   Url http://localhost:8080/post/likes/:postid
// @desc    Post from user post likes
// @access  private
router.post('/likes/:postid', checkAuth, (req, res) => {
    postModel
        .findById(req.params.postid)
        .then(post => {
            console.log(post.likes.filter(like => like.user.toString()))
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({
                    message : "User already liked this post"
                })
            }
            else
            {
                post.likes.unshift({ user : req.user.id })
                post
                    .save()
                    .then(post => res.status(200).json(post))
                    .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => {
            res.status(400).json({
                message : err.message
            })
        })




        // .catch(err => {
        //     res.status(400).json({
        //         message : err.message
        //     })
        // })
})









// @route   Url http://localhost:8080/post/likes/:postid
// @desc    Delete from user post like
// @access  private


module.exports = router




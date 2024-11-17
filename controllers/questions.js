const express = require('express')
const verifyToken = require('../middleware/verify-token')
const question = require('../models/question')
const Question = require('../models/question')
const router = express.Router()

// ========= Public Routes ===========


// ======= Protected Routes ==========
router.use(verifyToken)

// CREATE question
router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id
        const question = await Question.create(req.body)
        question._doc.author = req.user
        res.status(201).json(question)
    } catch (error) {
        res.status(500).json(error)
    }
})

// INDEX - GET ALL THE QUESTIONS


// SHOW - GET ONE QUESTION


// UPDATE A QUESTION

// DELETE A QUESTION


// CREATE A COMMENT
router.post('/:questionId/comments', async (req, res) => {
    try {
        req.body.author = req.user._id
        const question = await question.findById(req.params.questionId)
        question.comments.push(req.body)
        await question.save()

        const newComment = question.comments[question.comments.length - 1]

        newComment._doc.author = req.user

        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A COMMENT

// DELETE A COMMENT



module.exports = router
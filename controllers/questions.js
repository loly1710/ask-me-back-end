const express = require('express')
const verifyToken = require('../middleware/verify-token')
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

// INDEX - GET ALL THE QUESTIONS - I will do it tomorrow
router.get('/', async(req, res) => {
    try {
        const questions = await Question.find({})
        .populate('author')
        .sort({createdAt:'desc'});
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json(error);
    }
})

// SHOW - GET ONE QUESTION
router.get('/:questionId', async(req,res) => {
    try {
         const question = await Question.findById(req.params.questionId)
                                .populate('author')
                                .populate({
                                    path: 'comments.author',
                                    model: 'User'
                                })
                                .populate({
                                    path: 'comments.replies.author',
                                    model: 'User'
                                });
         res.status(200).json(question);
    } catch (error) {
        res.status(500).json(error);
    }
   

})

// UPDATE A QUESTION
router.put('/:questionId', async (req, res) => {
    try {
      const question = await Question.findById(req.params.questionId);
      // Check permissions:
      if (!question.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      // Update hoot:
      const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.questionId,
        req.body,
        { new: true }
      );
  
      // Append req.user to the author property:
      updatedQuestion._doc.author = req.user;
  
      // Issue JSON response:
      res.status(200).json(updatedQuestion);
    } catch (error) {
      res.status(500).json(error);
    }
});


// DELETE A QUESTION
router.delete('/:questionId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId)

        if (!question.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!")
        }
        const deletedQuestion = await Question.findByIdAndDelete(req.params.questionId)
        res.status(200).json(deletedQuestion)
    } catch (error) {
        res.status(500).json(error)
    }
})


// CREATE A COMMENT
router.post('/:questionId/comments', async (req, res) => {
    try {
        req.body.author = req.user._id
        const question = await Question.findById(req.params.questionId)
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
router.put('/:questionId/comments/:commentId', async (req, res) => {
    try {
      const question = await Question.findById(req.params.questionId);
      const comment = question.comments.id(req.params.commentId);
      comment.text = req.body.text;
      await question.save();
      res.status(200).json({ message: 'Ok' });
    } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE A COMMENT
router.delete('/:questionId/comments/:commentId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId)
        question.comments.remove({ _id: req.params.commentId })
        await question.save()
        res.status(200).json({ message: "Ok" })
    } catch (error) {
        res.status(500).json(error)
    }
})

//  REPLY TO A COMMENT
router.post('/:questionId/comments/:commentId/reply', async (req, res) => {
    try {
      req.body.author = req.user._id;
  
      const question = await Question.findById(req.params.questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found'   
        });
      }
  
      const commentIndex = question.comments.findIndex(el => el.id === req.params.commentId);
      if (commentIndex === -1) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      question.comments[commentIndex].replies.push(req.body);
  
      await question.save();

      const fetch_question = await Question.findById(req.params.questionId)
                                .populate('author')
                                .populate({
                                    path: 'comments.author',
                                    model: 'User'
                                })
                                .populate({
                                    path: 'comments.replies.author',
                                    model: 'User'
                                });

      const newReply = fetch_question.comments[commentIndex].replies[question.comments[commentIndex].replies.length - 1]
  
      res.status(201).json({ message: 'Reply saved successfully', newReply: newReply }); // Send a success message
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' }); // Generic error message for now
    }
});

// UPDATE A COMMENT REPLY
router.put('/:questionId/comments/:commentId/reply/:replyId', async (req, res) => {
    try {
        
      const question = await Question.findById(req.params.questionId);
      const comment = question.comments.id(req.params.commentId);
      const reply = comment.replies.id(req.params.replyId)
      reply.text = req.body.text;
      await question.save();
      res.status(200).json({ message: 'Ok' });
    } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE A COMMENT REPLY
router.delete('/:questionId/comments/:commentId/reply/:replyId', async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
            if (!question) {
                return res.status(404).json({ message: 'Question not found'   
            });
        }
  
        const commentIndex = question.comments.findIndex(el => el.id === req.params.commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }
  
      question.comments[commentIndex].replies.remove({ _id: req.params.replyId })
      await question.save()
      res.status(200).json({ message: "Ok" })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
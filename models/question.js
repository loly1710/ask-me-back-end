const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema(
  {
      text: { type: String, required: true },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);


const questionSchema = new mongoose.Schema(
  {
      title: { type: String, required: true },
      text: { type: String, required: true },
      category: {
          type: String,
          required: true,
          enum: [
              'Technology',
              'Health',
              'Education',
              'Travel',
              'Relationships',
              'Lifestyle',
              'Parenting',
              'Gaming',
              'Books',
              'Fitness',
              'Beauty',
              'Business',
          ],
      },
      author: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User' 
      },
      dateTime: { type: Date, default: Date.now },
      comments: [commentSchema],
  },
  { timestamps: true }
);


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

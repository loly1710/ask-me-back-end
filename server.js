const dotenv = require('dotenv')
dotenv.config()
const morgin = require('morgan');

const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const testJWTRouter = require('./controllers/test-jwt.js')
const usersRouter = require('./controllers/users.js')
const profilesRouter = require('./controllers/profiles.js')
const questionsRouter = require('./controllers/questions.js')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
app.use(morgin('dev'))
app.use(cors())
app.use(express.json())

// Routes go here
app.use('/test-jwt', testJWTRouter)
app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)
app.use('/question', questionsRouter)

app.listen(3000, () => {
  console.log('The express app is ready!')
})

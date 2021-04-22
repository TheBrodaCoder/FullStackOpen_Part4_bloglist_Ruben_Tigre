const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const blogRouter = require('./controllers/blog_controller')
const cors = require('cors')
const mongoose = require('mongoose')
const {mongoUrl} = require('./utils/config')
const usersRouter = require('./controllers/user_controller')
const loginRouter = require('./controllers/login_controller')
const tokenExtractor = require('./utils/middleware')


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(result => {
    console.log('Database connected')
}).catch(error=>
    console.log('Error at connect to the database')
)

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api' , blogRouter)
app.use('/api', usersRouter)
app.use('/api', loginRouter)

module.exports = app
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import signupRoute from './routes/signup.route.js'
import signinRoute from './routes/signin.route.js'
import googleRoute from './routes/google.route.js'

dotenv.config()
mongoose
  .connect(process.env.MONGODB_CONN)
  .then(() => {
    console.log('Connected to MongoDB')

    const app = express()
    app.use(express.json())
    app.listen(3000, () => console.log('Server listening on port 3000'))
    app.use('/api/user', userRoute)
    app.use('/api/signup', signupRoute)
    app.use('/api/signin', signinRoute)
    app.use('/api/google', googleRoute)
    app.use((err, req, res, next) => {
      console.log(err)
      const statusCode = err.statusCode || 500
      let message = err.message || 'Internal Server Error'
      if (message.includes('duplicate key')) {
        switch (req.url) {
          case '/api/signup':
            message = 'User already exists'
            break
        }
      }
      res.status(statusCode).json({
        success: false,
        message,
        statusCode,
      })
    })
  })
  .catch((error) => console.log(error))

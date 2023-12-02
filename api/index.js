import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import signupRoute from './routes/signup.route.js'
import signinRoute from './routes/signin.route.js'

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
    app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500
      const message = err.message || 'Internal Server Error'
      res.status(statusCode).json({
        success: false,
        message,
        statusCode,
      })
    })
  })
  .catch((error) => console.log(error))

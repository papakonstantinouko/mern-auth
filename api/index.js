import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import signupRoute from './routes/signup.route.js'

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
  })
  .catch((error) => console.log(error))

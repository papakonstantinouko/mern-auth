import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
mongoose
  .connect(process.env.MONGODB_CONN)
  .then(() => {
    const app = express()
    app.listen(3000, () => console.log('Server listening on port 3000'))
  })
  .catch((error) => console.log(error))

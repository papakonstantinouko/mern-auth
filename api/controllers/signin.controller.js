import userModel from '../models/user.model.js'
import { errorHandler } from './../utils/error.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function (req, res, next) {
  const { email, password } = req.body

  try {
    const dbUser = await userModel.findOne({ email })
    if (!dbUser) return next(errorHandler(404, 'No such user exists'))

    if (!bcryptjs.compareSync(password, dbUser.password))
      return next(errorHandler(401, 'Credentials are invalid'))

    const token = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET)
    const { password: hashedPassword, ...rest } = dbUser._doc
    const expires = new Date(Date.now() + Number(process.env.COOKIE_EXPIRES))
    res
      .cookie('access_token', token, { httpOnly: true, expires })
      .status(200)
      .json({
        success: true,
        payload: rest,
      })
  } catch (error) {
    next(error)
  }
}

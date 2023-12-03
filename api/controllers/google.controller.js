import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export default async function (req, res, next) {
  try {
    const { name, email, photo } = req.body
    let user = await User.findOne({ email })
    if (!user) {
      const password = Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(password, 10)
      user = new User({
        username: name,
        email,
        password: hashedPassword,
        profilePicture: photo,
      })
      await user.save()
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    const expires = new Date(Date.now() + Number(process.env.COOKIE_EXPIRES))
    const { password, ...rest } = user._doc
    res.cookie('access_token', token, { httpOnly: true, expires })
    res.json({ success: true, payload: rest })
  } catch (error) {
    next(error)
  }
}

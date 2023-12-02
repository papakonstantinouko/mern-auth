import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export default async function (req, res) {
  try {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password)
    const user = new User({ username, email, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

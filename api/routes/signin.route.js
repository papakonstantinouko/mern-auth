import signinController from '../controllers/signin.controller.js'

import express from 'express'
const router = express.Router()
router.post('', signinController)
export default router

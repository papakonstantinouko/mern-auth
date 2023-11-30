import express from 'express'

const router = express.Router()
router.get('/', (req, res) => {
  res.json({
    message: 'test api route',
  })
})
export default router

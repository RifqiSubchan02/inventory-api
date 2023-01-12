import { Router } from 'express'

import { auth } from '@/controllers'
import { validator } from '@/middlewares'

const router: Router = Router()

router.post('/login', auth.login)
router.post(
  '/register',
  validator.auth.signUp,
  validator.validate,
  auth.register
)

export default router

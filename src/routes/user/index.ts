import { Router } from 'express'

import { user } from '@/controllers'
import { verify } from '@/middlewares'

const router: Router = Router()

router.get('/', verify.admin, user.getAllUser)
router.get('/:id', verify.admin, user.getUserDetail)

export default router

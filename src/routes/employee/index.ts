import { Router } from 'express'

import { employee } from '@/controllers'
import { verify } from '@/middlewares'

const router: Router = Router()

router.get('/', employee.getAll)
router.get('/:id', employee.getDetail)
router.post('/', employee.create)

export default router

import { Router } from 'express'

import { warehouse } from '@/controllers'
import { validator } from '@/middlewares'

const router = Router()

router.get('/', warehouse.getAll)
router.post(
  '/',
  validator.warehouse.create,
  validator.validate,
  warehouse.create
)

export default router

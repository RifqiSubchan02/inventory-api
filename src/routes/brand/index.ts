import { Router } from 'express'

import { brand } from '@/controllers'
import { validator } from '@/middlewares'

const router = Router()

router.get('/', brand.getAllBrand)
router.post('/', brand.createBrand)
router.put('/:id', brand.updateBrand)
router.delete('/:id', brand.deleteBrand)

export default router

import { Router } from 'express'

import { product } from '@/controllers'
import { validator } from '@/middlewares'

const router = Router()

router.get('/', product.getAllProduct)
router.get('/:id', product.getDetailProduct)
router.post('/', product.createProduct)
router.delete('/:id', product.deleteProduct)

router.post('/:id/attribute', product.createAttribute)

export default router

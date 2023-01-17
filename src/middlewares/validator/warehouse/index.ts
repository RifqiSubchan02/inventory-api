import { body } from 'express-validator'

const create = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
]

export default { create }

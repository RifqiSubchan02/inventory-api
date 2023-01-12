import { body } from 'express-validator'

const signIn = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 4, max: 10 })
    .withMessage('Password at least min 4 char and max 10 char'),
]

const signUp = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 4, max: 10 })
    .withMessage('Password at least min 4 char and max 10 char'),
  body('name').notEmpty().withMessage('Name is required'),
]

export default { signIn, signUp }

import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { myResponse } from '@/helpers'

const { errorResponse } = myResponse

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return errorResponse({
      res,
      message: 'Invalid value',
      status: 400,
      error: errors.array(),
    })
  }

  next()
}

export default validate

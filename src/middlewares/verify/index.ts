import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { myResponse } from '@/helpers'

dotenv.config()

const { errorResponse } = myResponse

export interface AuthRequest extends Request {
  user: string | JwtPayload
}

const admin = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  try {
    const accessToken = authorization?.replace('Bearer ', '')

    const payloadToken = jwt.verify(
      accessToken as string,
      process.env.TOKEN_SECRET as string
    ) as JwtPayload

    // if (payloadToken.role !== 'ADMIN') {
    //   return errorResponse({
    //     res,
    //     message: 'Access forbidden',
    //     status: 403,
    //     error: {
    //       message: 'Only admin can access this route',
    //     },
    //   })
    // }

    ;(req as AuthRequest).user = payloadToken

    next()
  } catch (error: any) {
    errorResponse({ res, message: 'Access denied', status: 401, error })
  }
}

export default { admin }

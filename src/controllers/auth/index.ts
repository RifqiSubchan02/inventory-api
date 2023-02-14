import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { myResponse } from '@/helpers'

dotenv.config()

const prisma = new PrismaClient({ errorFormat: 'minimal' })
const { successResponse, errorResponse } = myResponse

async function login(req: Request, res: Response) {
  const { email, password } = req.body

  try {
    const employee = await prisma.employee.findUnique({ where: { email } })
    if (!employee)
      return errorResponse({ res, message: 'Employee not found', status: 404 })

    const isValidPass = await bcrypt.compare(password, employee.password)
    if (!isValidPass)
      return errorResponse({ res, message: 'Password is wrong', status: 400 })

    const accessToken = jwt.sign(
      { id: employee.id, role: employee.role },
      process.env.TOKEN_SECRET as string
    )

    successResponse({
      res,
      message: 'Login success',
      status: 200,
      data: { accessToken, role: employee.role },
    })
  } catch (error: any) {
    errorResponse({
      res,
      message: 'Something went wrong',
      status: 500,
      error: error,
    })
  }
}

export default { login }

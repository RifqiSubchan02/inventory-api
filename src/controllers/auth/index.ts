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
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user)
      return errorResponse({ res, message: 'User not found', status: 404 })

    const isValidPass = await bcrypt.compare(password, user.password)
    if (!isValidPass)
      return errorResponse({ res, message: 'Password is wrong', status: 400 })

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.TOKEN_SECRET as string
    )

    successResponse({
      res,
      message: 'Sign in success',
      status: 200,
      data: { accessToken, role: user.role },
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

async function register(req: Request, res: Response) {
  const { email, password, name, role } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        role: role,
      },
    })

    successResponse({ res, message: 'Sign up success', status: 200 })
  } catch (error: any) {
    errorResponse({
      res,
      message: 'Something went wrong',
      status: 500,
      error: error,
    })
  }
}

export default { login, register }

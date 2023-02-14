import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

import { myResponse, pagination } from '@/helpers'

const prisma = new PrismaClient()
const { successResponse, errorResponse } = myResponse

type ReqQuery = {
  page?: string
  pageSize?: string
}

async function getAll(req: Request<any, any, any, ReqQuery>, res: Response) {
  try {
    const { take, skip } = pagination(req)

    const employees = await prisma.employee.findMany({
      take: take,
      skip: skip,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        // role: 'USER',
      },
    })

    const totalCount = await prisma.employee.count()

    successResponse({
      res,
      message: 'Get all employees',
      data: employees,
      status: 200,
      totalCount,
      page: skip,
      pageSize: take,
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

async function getDetail(req: Request, res: Response) {
  const { id } = req.params
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    if (!employee)
      return errorResponse({
        res,
        message: 'Employee not found',
        status: 404,
      })

    successResponse({
      res,
      message: 'Get employee detail',
      data: employee,
      status: 200,
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

async function create(req: Request, res: Response) {
  const { email, password, name, role } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.employee.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    })

    successResponse({ res, message: 'Create employee success', status: 200 })
  } catch (error: any) {
    errorResponse({
      res,
      message: 'Something went wrong',
      status: 500,
      error: error,
    })
  }
}

export default { getAll, getDetail, create }

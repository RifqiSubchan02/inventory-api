import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { myResponse, pagination } from '@/helpers'

const prisma = new PrismaClient()
const { successResponse, errorResponse } = myResponse

type ReqQuery = {
  page?: string
  pageSize?: string
}

async function getAllUser(
  req: Request<any, any, any, ReqQuery>,
  res: Response
) {
  try {
    const { take, skip } = pagination(req)

    const users = await prisma.user.findMany({
      take: take,
      skip: skip,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      where: {
        // role: 'USER',
      },
    })

    const userCount = await prisma.user.count()

    successResponse({
      res,
      message: 'Get All User',
      data: users,
      status: 200,
      totalCount: userCount,
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

async function getUserDetail(req: Request, res: Response) {
  const { id } = req.params
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user)
      return errorResponse({
        res,
        message: 'User not found',
        status: 404,
      })

    successResponse({
      res,
      message: 'Get User Detail',
      data: user,
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

export default { getAllUser, getUserDetail }

import { Request, Response } from 'express'
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

    const warehouses = await prisma.warehouse.findMany({
      take: take,
      skip: skip,
    })

    const totalCount = await prisma.warehouse.count()

    successResponse({
      res,
      message: 'Get all warehouse',
      data: warehouses,
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

async function create(req: Request, res: Response) {
  try {
    const { name, address } = req.body

    await prisma.warehouse.create({ data: { name, address } })

    successResponse({ res, message: 'Create warehouse success', status: 200 })
  } catch (error: any) {
    errorResponse({
      res,
      message: 'Something went wrong',
      status: 500,
      error: error,
    })
  }
}

export default { getAll, create }

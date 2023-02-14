import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

import { myResponse, pagination } from '@/helpers'

const prisma = new PrismaClient()
const { successResponse, errorResponse } = myResponse

async function getAllBrand(req: Request, res: Response) {
  try {
    const { take, skip } = pagination(req)

    const brand = await prisma.brand.findMany({
      take: take,
      skip: skip,
    })

    const totalCount = await prisma.brand.count()

    successResponse({
      res,
      message: 'Get all brand',
      data: brand,
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

async function createBrand(req: Request, res: Response) {
  try {
    const { name } = req.body

    await prisma.brand.create({ data: { name } })

    successResponse({ res, message: 'Create brand success', status: 200 })
  } catch (error: any) {
    errorResponse({
      res,
      message: 'Something went wrong',
      status: 500,
      error: error,
    })
  }
}

async function updateBrand(req: Request, res: Response) {
  try {
    const { name } = req.body
    const { id } = req.params

    await prisma.brand.update({ where: { id: Number(id) }, data: { name } })

    successResponse({ res, message: 'Update brand success', status: 200 })
  } catch (error: any) {
    errorResponse({
      res,
      message: 'Something went wrong',
      status: 500,
      error: error,
    })
  }
}

async function deleteBrand(req: Request, res: Response) {
  try {
    const { id } = req.params

    await prisma.brand.delete({ where: { id: Number(id) } })

    successResponse({ res, message: 'Delete brand success', status: 200 })
  } catch (error: any) {
    console.log(error)

    errorResponse({
      res,
      message: 'Something went wrong',
      status: 500,
      error: error,
    })
  }
}

export default { getAllBrand, createBrand, updateBrand, deleteBrand }

import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

import { myResponse, pagination } from '@/helpers'

const prisma = new PrismaClient()
const { successResponse, errorResponse } = myResponse

async function getAllProduct(req: Request, res: Response) {
  try {
    const { take, skip } = pagination(req)

    const products = await prisma.product.findMany({
      take: take,
      skip: skip,
      include: {
        brand: true,
      },
    })

    const totalCount = await prisma.product.count()

    successResponse({
      res,
      message: 'Get all product',
      data: products,
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

async function createProduct(req: Request, res: Response) {
  try {
    const { name, brandId } = req.body

    await prisma.product.create({ data: { name, brandId } })

    successResponse({ res, message: 'Create product success', status: 200 })
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

async function getDetailProduct(req: Request, res: Response) {
  const { id } = req.params
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        attribute: {
          where: {
            productId: id,
          },
          include: {
            attributeValue: true,
          },
        },
        brand: true,
      },
    })

    successResponse({
      res,
      message: 'Get detail product',
      status: 200,
      data: product,
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

async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params

    await prisma.product.delete({ where: { id } })

    successResponse({ res, message: 'Delete product success', status: 200 })
  } catch (error: any) {
    errorResponse({
      res,
      message: 'Something went wrong',
      status: 500,
      error: error,
    })
  }
}

async function createAttribute(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { name, attributeValue } = req.body

    await prisma.attribute.create({
      data: {
        name: name,
        productId: id,
        attributeValue: {
          createMany: {
            data: attributeValue,
          },
        },
      },
    })

    successResponse({ res, message: 'Create attribute success', status: 200 })
  } catch (error: any) {
    errorResponse({
      res,
      message: 'Something went wrong',
      status: 500,
      error: error,
    })
  }
}

export default {
  getAllProduct,
  getDetailProduct,
  createProduct,
  deleteProduct,
  createAttribute,
}

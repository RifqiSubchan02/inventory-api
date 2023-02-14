import { Request, Response } from 'express'

interface SuccessPayload {
  req?: Request
  res: Response
  message: string
  status: number
  data?: object | ReadonlyArray<object> | null
  totalCount?: number
  page?: number
  pageSize?: number
}

interface ErrorPayload {
  req?: Request
  res: Response
  message: string
  status: number
  error?: object | ReadonlyArray<object>
}

const successResponse = ({
  req,
  res,
  message,
  data,
  status,
  totalCount,
  page,
  pageSize,
}: SuccessPayload) => {
  res.status(status).send({
    status,
    message,
    data: data === null ? {} : data,
    totalCount,
    page:
      page !== undefined && pageSize !== undefined
        ? page / pageSize + 1
        : undefined,
    pageSize,
  })
}

const errorResponse = ({ req, res, message, status, error }: ErrorPayload) => {
  res.status(status).send({
    status,
    message,
    error,
  })
}

export default { successResponse, errorResponse }

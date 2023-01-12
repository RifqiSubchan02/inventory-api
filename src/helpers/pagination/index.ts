const pagination = (req: any) => {
  const { page, pageSize } = req.query

  let skip: number | undefined // page
  let take: number | undefined // pageSize

  if (!page || !pageSize)
    return {
      skip,
      take,
    }

  return {
    skip: (parseInt(page) - 1) * parseInt(pageSize),
    take: parseInt(pageSize),
  }
}

export default pagination

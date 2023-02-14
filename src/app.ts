import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { auth, brand, employee, product, warehouse } from '@/routes'

dotenv.config()

const app: Express = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', auth)
app.use('/employee', employee)
app.use('/warehouse', warehouse)
app.use('/product', product)
app.use('/brand', brand)

app.get('/', (req: Request, res: Response) => res.send('Welcome to My API'))

app.listen(process.env.PORT, () => {
  console.log(`Server Up and Running on Port ${process.env.PORT}`)
})

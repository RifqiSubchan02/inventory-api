import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { auth, user } from '@/routes'

dotenv.config()

const app: Express = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', auth)
app.use('/user', user)

app.get('/', (req: Request, res: Response) => res.send('Welcome to My API'))

app.listen(process.env.PORT, () => {
  console.log(`Server Up and Running on Port ${process.env.PORT}`)
})

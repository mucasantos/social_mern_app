import express from 'express'
/*
 * To handle HTTP requests and serve responses properly,
 *  we will use the following modules to configure Express:
 */
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

import Template from './../template'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('/', (req, res) => {
    res.status(200).send(Template())
})

app.use((err, req, res, next)=> {
    if (err.name ==='UnauthorizedError') {
        res.status(401).json({
            error: err.name + ":"+ err.message
        })
    } else if(err){
        res.status(400).json({
            error: err.name + ":"+ err.message
        })
    }
})

export default app
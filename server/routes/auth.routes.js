import express from 'express'
import authContrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/auth/signin')
    .post(authContrl.signin)

router.route('/auth/signout')
    .post(authContrl.signout)




export default router
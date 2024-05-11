import express from 'express'
import userCtrl from '../controllers/user.controller'
import authContrl from '../controllers/auth.controller'

const router = express.Router()


router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(authContrl.requireSignin, userCtrl.read)
    .put(authContrl.requireSignin, authContrl.hasAuthorization, userCtrl.update)
    .delete(authContrl.requireSignin, authContrl.hasAuthorization, userCtrl.remove)


//Verica se tem param na rota!
router.param('userId', userCtrl.userByID)


export default router
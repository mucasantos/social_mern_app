
import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req, res) => {
    console.log(req.body);
    const user = new User(req.body)

    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400)
            .json({
                error: errorHandler.getErrorMessage(err)
            })
    }
}
const userByID = async (req, res, next, id) => {

    console.log(id);
    try {
        let user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                error: "User not found!"
            })
        }
        //Read the user and call next controller function (read)
        req.profile = user
        next()  //Chama o próximo método!
    } catch (error) {
        return res.status(400).json({
            error: "Could not retrieve User!"
        })
    }
}
const read = (req, res) => { 
    //Before sending data to client, remove the sensitives information
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    return res.status(200).json(req.profile)
}
const update = async(req, res, next) => { 

    console.log("Vamos fazer o update!!");
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined

        res.status(200).json(user)
    } catch (err) {
        return res.status(400)
            .json({
                error: errorHandler.getErrorMessage(err)
            })
    }
}
const remove = async(req, res) => {

    try {
        let user = req.profile
        let deletedUser = await user.deleteOne()
        deletedUser.salt = undefined
        deletedUser.hashed_password = undefined
        res.status(200).json(deletedUser)
    } catch (err) {
        return res.status(400)
        .json({
            error: errorHandler.getErrorMessage(err)
        })
    }
 }


export default { create, userByID, read, list, remove, update }
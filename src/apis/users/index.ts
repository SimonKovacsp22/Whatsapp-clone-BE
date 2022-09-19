import { RequestHandler } from "express"
import UserModel from "./model"
import { IUserRequest } from '../../lib/JWTMiddleware'
import createHttpError from "http-errors"

export const registerUser: RequestHandler = async (req,res,next) => {
    try {
        
        const newUser = new UserModel(req.body)
     
        const {_id} = await newUser.save()

        res.status(201).send({_id})

    } catch (error) {

        next(error)
        
    }
}
 export const loginUser: RequestHandler = async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
 }
export const sendNewTokens: RequestHandler = async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
export const updateUser: RequestHandler = async (req:IUserRequest,res,next) => {
    try {
        
        const updatedUser = UserModel.findByIdAndUpdate(req.user?._id, req.body, {new:true,runValidators:true})

        if(!updateUser) {
            next(createHttpError(404, `User with id: ${req.user?._id} not found`))
        } else {
            res.status(204).send(updatedUser)
        }
    } catch (error) {
        next(error)
    }
}

export const addAvatar: RequestHandler = async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
export const logoutUser: RequestHandler = async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
}
export const getUsers: RequestHandler = async (req,res,next) => {
    try {

        const users = await UserModel.find()

        res.send(users)
        
    } catch (error) {
        next(error)
    }
}
export const getMe: RequestHandler = async (req : IUserRequest,res,next) => {
    try {

        const me = await UserModel.findById(req.user?._id)

        if(!me) {
            next(createHttpError(404,`user with id:$${req.user?._id} not found`))
        } else {
            res.send(me)
        }
        
    } catch (error) {
        next(error)
        
    }
}
export const getUserById: RequestHandler = async (req,res,next) => {
    try { 

        const user = await UserModel.findById(req.params.id)
        if(!user) {
            next(createHttpError(404,`user with id:$${req.params.id} not found`))
        } else {
            res.send(user)
        }
        
    } catch (error) {
        next(error)
        
    }
}
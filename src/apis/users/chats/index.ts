import mongoose from "mongoose";
import { RequestHandler } from "express";
import ChatModel from "./model"
import { IUserRequest } from "../../../lib/JWTMiddleware";


export const createChat:RequestHandler = async (req: IUserRequest, res, next) => {
  try {
    //    const chats = await ChatModel.find()

    //    const existingChat = chats.filter( chat => chat.members.includes(req.user?._id) && chat.members.includes(req.body.recipient))
    // if(existingChat){
    //     res.status(200).send(existingChat)

    // } else {
        const newChat = new ChatModel()

        newChat.members = [...req.body.recipient, req.user?._id]
 
        const {members} = await newChat.save()
 
        res.status(201).send(members)
    // }
     
    
  } catch (error) {
    next(error)
  }
}

export const getMyChats : RequestHandler = async (req:IUserRequest , res, next) => {
    try {

        const chats = await ChatModel.find()

        const myChats = chats.filter( chat => chat.members.includes(req.user?._id))
        
        res.send(myChats)

    } catch (error) {
        next(error)
    }
}

export const getMessageHistory : RequestHandler = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
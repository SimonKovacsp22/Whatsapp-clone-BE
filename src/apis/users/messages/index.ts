import { RequestHandler } from "express";
import mongoose from "mongoose";
import MessageModel from "./model"

export const sendMessage:RequestHandler = async (req,res,next) => {
  try {

     const message = new MessageModel(req.body)

     const {_id} = await message.save()

     res.status(201).send({_id})

    
  } catch (error) {
    next(error)
  }
}
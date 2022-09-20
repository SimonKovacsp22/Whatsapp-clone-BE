import express from "express"
import {sendMessage} from "./index"

const messagesRouter = express.Router()

messagesRouter.use("/", sendMessage)

export default messagesRouter
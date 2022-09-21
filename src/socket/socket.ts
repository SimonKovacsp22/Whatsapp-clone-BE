import mongoose from "mongoose";
import ChatModel from "../apis/users/chats/model"
import MessageModel from "../apis/users/messages/model"

export const newConnectionHandler = (socket) => {

  const id = socket.handshake.query.id
  const chatId = socket.handshake.query.chatId
  socket.join(id)

  socket.on("send-message", async ({recipients, text}) => {
    const message = new MessageModel({sender: id, content: {text: text, media: ''}})
    const {_id} = await message.save()
    const chat = await ChatModel.findByIdAndUpdate(chatId,{ $push: { messages: _id}})
    

    console.log(text)
    console.log(recipients)
    recipients.forEach(recipient => {
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients, sender:id, text
      })
    })
  })

  

  
};
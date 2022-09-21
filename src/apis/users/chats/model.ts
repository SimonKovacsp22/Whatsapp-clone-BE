import mongoose from "mongoose";

const{ model, Schema} = mongoose

export const chatSchema = new Schema ({
  members:[{type:mongoose.Types.ObjectId, ref:"User"}],
  messages:[{type: mongoose.Types.ObjectId, ref:"Message"}]
})

export default model("Chat", chatSchema)
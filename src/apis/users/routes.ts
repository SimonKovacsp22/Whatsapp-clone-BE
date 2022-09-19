import express from "express"
import {registerUser, loginUser, sendNewTokens, updateUser, logoutUser, getUsers, getMe, getUserById, addAvatar} from "./index"


const userRouter = express.Router()


userRouter.post("/account", registerUser)

userRouter.post("/session", loginUser)

userRouter.post("/me/avatar", addAvatar)

userRouter.post("/session/refresh", sendNewTokens )

userRouter.put("/me", updateUser)

userRouter.delete("/session", logoutUser)

userRouter.get("/", getUsers)

userRouter.get("/me", getMe)

userRouter.get("/:id", getUserById)

export default userRouter
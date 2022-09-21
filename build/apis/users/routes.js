"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./index");
const JWTMiddleware_1 = require("../../lib/JWTMiddleware");
const userRouter = express_1.default.Router();
userRouter.post("/account", index_1.registerUser);
userRouter.post("/session", index_1.loginUser);
userRouter.post("/me/avatar", index_1.addAvatar);
userRouter.post("/session/refresh", index_1.sendNewTokens);
userRouter.put("/me", JWTMiddleware_1.JWTAuthMiddleware, index_1.updateUser);
userRouter.delete("/session", index_1.logoutUser);
userRouter.get("/", index_1.getUsers);
userRouter.get("/me", JWTMiddleware_1.JWTAuthMiddleware, index_1.getMe);
userRouter.get("/:id", index_1.getUserById);
exports.default = userRouter;

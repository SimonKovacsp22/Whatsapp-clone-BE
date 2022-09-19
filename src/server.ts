import express from "express";
import { createServer } from "http";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import userRouter from "./apis/users/routes";

const port = process.env.PORT || 3001;

const expressServer = express();
const httpServer = createServer(expressServer);

const io = new Server(httpServer);

expressServer.use(cors);

expressServer.use("/users", userRouter)

mongoose.connect(process.env.MONGO_CON_URL!);

mongoose.connection.on("connected", () =>
  expressServer.listen(port, () => {
    console.table(listEndpoints(expressServer));
    console.log(`server is listening on port:${port}`);
  })
);

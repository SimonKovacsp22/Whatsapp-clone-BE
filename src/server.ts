import express from "express";
import { createServer } from "http"
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import cors from "cors"
import { Server } from "socket.io";


const port = process.env.PORT || 3001


const expressServer = express()
const httpServer = createServer(expressServer)
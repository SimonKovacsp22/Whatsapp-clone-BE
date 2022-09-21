"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const routes_1 = __importDefault(require("./apis/users/routes"));
const errorHandlers_1 = require("./lib/errorHandlers");
const port = process.env.PORT || 3001;
const expressServer = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(expressServer);
const io = new socket_io_1.Server(httpServer);
expressServer.use((0, cors_1.default)());
expressServer.use(express_1.default.json());
expressServer.use("/users", routes_1.default);
expressServer.use(errorHandlers_1.badRequestHandler);
expressServer.use(errorHandlers_1.unauthorizedHandler);
expressServer.use(errorHandlers_1.forbiddenErrorHandler);
expressServer.use(errorHandlers_1.notFoundHandler);
expressServer.use(errorHandlers_1.genericServerErrorHandler);
mongoose_1.default.connect(process.env.MONGO_CON_URL);
mongoose_1.default.connection.on("connected", () => {
    expressServer.listen(port, () => {
        console.table((0, express_list_endpoints_1.default)(expressServer));
        console.log(`server is listening on port:${port}`);
    });
});

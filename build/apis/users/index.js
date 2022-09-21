"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getMe = exports.getUsers = exports.logoutUser = exports.addAvatar = exports.updateUser = exports.sendNewTokens = exports.loginUser = exports.registerUser = void 0;
const model_1 = __importDefault(require("./model"));
const http_errors_1 = __importDefault(require("http-errors"));
const tokens_1 = require("../../lib/tokens");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new model_1.default(req.body);
        const { _id } = yield newUser.save();
        res.status(201).send({ _id });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.checkCredentials(req.body.email, req.body.password);
        if (user) {
            const token = yield (0, tokens_1.createAccessToken)({ _id: user._id });
            res.send(token);
        }
        else {
            next((0, http_errors_1.default)(401, `Unauthorized, please provide matching credentials`));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const sendNewTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.sendNewTokens = sendNewTokens;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const updatedUser = yield model_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!exports.updateUser) {
            next((0, http_errors_1.default)(404, `User with id: ${(_b = req.user) === null || _b === void 0 ? void 0 : _b._id} not found`));
        }
        else {
            res.status(204).send(updatedUser);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const addAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const user = yield model_1.default.findByIdAndUpdate((_c = req.user) === null || _c === void 0 ? void 0 : _c._id, { avatar: (_d = req.file) === null || _d === void 0 ? void 0 : _d.path }, { new: true, runValidators: true });
        if (!user) {
            next((0, http_errors_1.default)(404, `Post with id: ${req.params.postId} not found`));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.addAvatar = addAvatar;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.logoutUser = logoutUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_1.default.find();
        res.send(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const me = yield model_1.default.findById((_e = req.user) === null || _e === void 0 ? void 0 : _e._id);
        if (!me) {
            next((0, http_errors_1.default)(404, `user with id:${(_f = req.user) === null || _f === void 0 ? void 0 : _f._id} not found`));
        }
        res.send(me);
    }
    catch (error) {
        next(error);
    }
});
exports.getMe = getMe;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(req.params.id);
        if (!user) {
            next((0, http_errors_1.default)(404, `user with id:$${req.params.id} not found`));
        }
        else {
            res.send(user);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;

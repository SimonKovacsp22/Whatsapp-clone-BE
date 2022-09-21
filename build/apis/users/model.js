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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { model, Schema } = mongoose_1.default;
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String }
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUser = this;
        const plainPW = currentUser.password;
        if (currentUser.isModified("password")) {
            const hash = yield bcrypt_1.default.hash(plainPW, 10);
            currentUser.password = hash;
        }
        next();
    });
});
userSchema.methods.toJSON = function () {
    const userDocument = this;
    const user = userDocument.toObject();
    delete user.password;
    delete user.__v;
    return user;
};
userSchema.static("checkCredentials", function (email, plainPW) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        if (user) {
            const isMatch = yield bcrypt_1.default.compare(plainPW, user.password);
            if (isMatch) {
                return user;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    });
});
exports.default = model("User", userSchema);

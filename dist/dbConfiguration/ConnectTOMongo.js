"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const monoDb = __importStar(require("mongoose"));
const userSchema = new monoDb.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    publickey: { type: String, required: true },
    privatekey: { type: String, required: true }
});
async function ConnectToDB() {
    monoDb.connect("mongodb+srv://adimulamyaswanth1:yasu2015@cluster0.npcfs.mongodb.net/tokenlaunchpad").then(() => {
        console.log("successfully connected to DB");
    }).catch((e) => {
        console.log("can not connect to db");
    });
}
const UserModel = monoDb.model("user", userSchema);
exports.default = {
    ConnectToDB,
    UserModel
};
//# sourceMappingURL=ConnectTOMongo.js.map
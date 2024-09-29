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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
const ENVCONFIG_js_1 = __importDefault(require("../ENVCONFIG.js"));
const ConnectTOMongo_1 = __importDefault(require("../dbConfiguration/ConnectTOMongo"));
const authMiddleWare_1 = __importDefault(require("../middlewares/authMiddleWare"));
require("../ENVCONFIG");
const router = express_1.default.Router();
router.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const privatekey = req.body.privatekey;
    const publickey = req.body.publickey;
    if (email && password && privatekey && publickey) {
        const userData = await ConnectTOMongo_1.default.UserModel.create({
            email: email,
            password: password,
            privatekey: privatekey,
            publickey: publickey
        });
        res.status(201).json({
            message: "user created"
        });
    }
    else {
        res.status(401).json({
            message: "Please enter all fields"
        });
    }
});
router.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const userdata = await ConnectTOMongo_1.default.UserModel.findOne({
            email: email,
            password: password
        });
        if (!userdata) {
            res.status(404).json({
                message: "incorrect email or password"
            });
        }
        else {
            const token = jwt.sign({
                userid: userdata._id
            }, process.env.SERVER_SECRET);
            res.status(200).json({
                token: token
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "not able to access db",
            secret: ENVCONFIG_js_1.default.sharedInstance().getServerSecret()
        });
    }
});
router.get("/privatekey", authMiddleWare_1.default, async (req, res) => {
    const userid = req.userid;
    const userData = await ConnectTOMongo_1.default.UserModel.findById(userid);
    const privatekey = userData?.privatekey;
    res.status(200).json({
        privatekey: privatekey
    });
});
router.get("/publickey", authMiddleWare_1.default, async (req, res) => {
    const userid = req.userid;
    const userData = await ConnectTOMongo_1.default.UserModel.findById(userid);
    const publickey = userData?.publickey;
    res.status(200).json({
        publickey: publickey
    });
});
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map
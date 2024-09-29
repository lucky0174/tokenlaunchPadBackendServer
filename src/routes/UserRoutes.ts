import express from "express";
import { appendFile } from "fs";
import { env } from "process";
import * as jwt from "jsonwebtoken";
import dbConfig from "../dbConfiguration/ConnectTOMongo"
import authMiddleWare from "../middlewares/authMiddleWare";

const secret = env.SERVER_SECRET as string
const router = express.Router()




router.post("/signup", async (req,res) => {
    const email: string = req.body.email
    const password: string = req.body.password
    const privatekey: string = req.body.privatekey
    const publickey: string = req.body.publickey

    if(email && password && privatekey && publickey) {
        const userData = await dbConfig.UserModel.create({
            email: email,
            password: password,
            privatekey: privatekey,
            publickey: publickey
        })
        res.status(201).json({
            message: "user created"
        })
    } else {
        res.status(401).json({
            message: "Please enter all fields"
        })
    }
})



router.post("/signin",async (req, res)=>{
    const email: string = req.body.email as string
    const password: string = req.body.password as string
    try {
        const userdata = await dbConfig.UserModel.findOne({
            email: email,
            password: password
        })
        if (!userdata) {
            res.status(404).json({
                message: "incorrect email or password"
            })
        } else {
            const token = jwt.sign({
                userid: userdata._id
            }, secret)
            res.status(200).json({
                token: token
            })
        }
    } catch(error) {
        res.status(404).json({
            message: "not able to access db"
        })
    }
})

router.get("/privatekey", authMiddleWare , async (req: any, res) => {
    const userid = req.userid as string
    const userData = await dbConfig.UserModel.findById(userid)
    const privatekey = userData?.privatekey
    res.status(200).json({
        privatekey: privatekey
    })
})

router.get("/privatekey", authMiddleWare , async (req: any, res) => {
    const userid = req.userid as string
    const userData = await dbConfig.UserModel.findById(userid)
    const publickey = userData?.publickey
    res.status(200).json({
        publickey: publickey
    })
})
export default router;
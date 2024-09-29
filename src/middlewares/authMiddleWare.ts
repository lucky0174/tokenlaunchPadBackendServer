import * as jwt from "jsonwebtoken"
import { env } from "process"

const secret = env.SERVER_SECRET as string

async function authMiddleWare(req: any, res: any, next: any){
    const token = req.headers.token
    const data = await jwt.verify(token, secret) as any
    if(data) {
        req.userid = data.userid as string
        next()
    } else {
        res.status(409).json({
            message: "invalid token"
        })
    }
}



export default authMiddleWare
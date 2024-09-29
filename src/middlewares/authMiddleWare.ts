import * as jwt from "jsonwebtoken"
import { env } from "process"
import * as config from "../ENVCONFIG"

async function authMiddleWare(req: any, res: any, next: any){
    const token = req.headers.token
    const data = await jwt.verify(token, config.SERVER_SECRET as string) as any
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
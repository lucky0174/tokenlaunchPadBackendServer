import * as monoDb from "mongoose"

interface User {
    email: string,
    password: string,
    publickey: string,
    privatekey: string
}

const userSchema = new monoDb.Schema<User>({
    email: { type: String, required: true},
    password: { type: String, required: true },
    publickey: {type: String, required: true},
    privatekey: {type: String, required: true}
})

 async function ConnectToDB() {
    monoDb.connect("mongodb+srv://adimulamyaswanth1:yasu2015@cluster0.npcfs.mongodb.net/tokenlaunchpad").then(()=>{
        console.log("successfully connected to DB")
    }).catch((e: any)=>{
        console.log("can not connect to db")
    })
}

const UserModel = monoDb.model("user", userSchema)

export default {
    ConnectToDB,
    UserModel
}
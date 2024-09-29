import express from "express"
import ConnectTOMongo from "./dbConfiguration/ConnectTOMongo"
import router from "./routes/UserRoutes"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/user", router)
ConnectTOMongo.ConnectToDB()
app.listen(8080)
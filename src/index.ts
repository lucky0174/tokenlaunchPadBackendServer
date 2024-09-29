import express from "express"
import ConnectTOMongo from "./dbConfiguration/ConnectTOMongo"
import router from "./routes/UserRoutes"

const app = express()
app.use(express.json())
app.use("/api/user", router)
ConnectTOMongo.ConnectToDB()
app.listen(8080)
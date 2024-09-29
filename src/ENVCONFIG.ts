import * as dotenv from "dotenv"

const values:any = dotenv.config().parsed

export const SERVER_SECRET = values.SERVER_SECRET
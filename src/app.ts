import express, { json } from "express"
import cors from "cors"
import routes from "./routes"
import { resolve } from "path"

declare global {
    namespace Express {
        interface Request {
            injection: any
        }
    }
}

const app = express()
app.use('/public', express.static(resolve(__dirname, './public')))
app.use(cors())
app.use(json())
app.use(routes)

export { app }
import express, { json } from "express"
import cors from "cors"
import routes from "./routes"
import { resolve } from "path"
import { P2PServer } from "./server_p2p"
import { Blockchain } from "./modules/Blockchain/blockchain"

declare global {
    namespace Express {
        interface Request {
            p2pserver: P2PServer
            blockchain: Blockchain
        }
    }
}

const app = express()
app.use('/public', express.static(resolve(__dirname, './public')))
app.use(cors())
app.use(json())
app.use(routes)

export { app }
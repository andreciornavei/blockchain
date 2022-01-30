import http from 'http'
import { app } from "./app"
import { Blockchain } from './modules/Blockchain/blockchain';
import { P2PServer } from './server_p2p';
require("dotenv").config({ path: ".env" })

const blockchain = new Blockchain();
const p2pServer = new P2PServer(blockchain);
const server = new http.Server(app)

server.listen(process.env.HTTP_PORT || 1337, () => {
    console.log(`Server started on http://localhost:${process.env.HTTP_PORT || 1337}`)
    p2pServer.listen()
})
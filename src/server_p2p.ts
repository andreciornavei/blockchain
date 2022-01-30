/*********************************************************/
/** Import websocket lib to enable p2p solution         **/
/*********************************************************/
import Websocket from "ws"
import { Blockchain } from "./modules/Blockchain/blockchain"

/*********************************************************/
/** Retrieve the peer port to try connection            **/
/*********************************************************/
const P2P_PORT = (process.env.P2P_PORT || 5001) as number

/*********************************************************/
/** Retrieve all peers the server will try to connect   **/
/*********************************************************/
const peers = process.env.PEERS ? process.env.PEERS.split(",") : []


/*********************************************************/
/** Define the class responsible to manage peers        **/
/*********************************************************/
export class P2PServer {

    blockchain: Blockchain
    sockets: Websocket[]

    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain
        this.sockets = []
    }

    listen() {
        const server = new Websocket.Server({ port: P2P_PORT })
        server.on("connection", socket => this.connectSocket(socket))
        this.connectToPeers()
        console.log(`Listening for p2p connections on ${P2P_PORT}`)
    }

    connectToPeers() {
        peers.forEach(peer => {
            const socket = new Websocket(peer)
            socket.on('open', () => this.connectSocket(socket))
        })
    }

    connectSocket(socket) {
        this.sockets.push(socket)
        console.log(`Socket connected`)
        this.messageHandler(socket)
        this.sendChain(socket)
    }

    messageHandler(socket: Websocket) {
        socket.on('message', (message: Websocket.RawData) => {
            const data = JSON.parse(message.toString())
            this.blockchain.replaceChain(data)
        })
    }

    sendChain(socket: Websocket) {
        socket.send(JSON.stringify(this.blockchain.chain))
    }

    syncChains() {
        for (const socket of this.sockets) {
            this.sendChain(socket)
        }
    }
}

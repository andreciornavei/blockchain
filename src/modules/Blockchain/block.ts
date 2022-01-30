import SHA256 from "crypto-js/sha256"

export class Block {

    constructor(private timestamp, private lastHash, private hash, private data) { }

    toString() {
        return `
            Block       -
            Timestamp   : ${this.timestamp}
            Last Hash   : ${this.lastHash}
            Hash        : ${this.hash}
            Data        : ${this.data}
        `
    }

    static genesis() {
        return new this(`Genesis time`, '------', 'f1r57-h45h', [])
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        const hash = Block.hash(timestamp, lastHash, data)
        return new this(timestamp, lastHash, hash, data)
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }

    static blockHash(block) {
        const { timestamp, lastHash, data } = block
        return Block.hash(timestamp, lastHash, data)
    }

}
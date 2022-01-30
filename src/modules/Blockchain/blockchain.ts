import { Block } from "./block"

export class Blockchain {

    chain: Block[]

    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data)
        this.chain.push(block)
        return block
    }

    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false
        for (let i = 0; i < chain.length; i++) {
            const block = chain[i]
            const lastBlock = chain[i - 1]
            if (
                block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHash(block)
            ) {
                return false
            }
        }
        return true
    }

    replaceChain(newChain: Block[]) {
        if (newChain.length <= this.chain.length)
            return console.log(`Received chain is not longer then current chain.`)
        if (!this.isValidChain(newChain))
            return console.log(`Received chain is not valid`)
        this.chain = newChain
        return console.log(`Replacing blockchain with the new chain.`)
    }

}
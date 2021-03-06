
const SHA256 = require('crypto-js/sha256');

class CryptoBlock {  // class to create new block on the block chain

    constructor(index, timestamp, data, precedingHash = " ") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash =this.computeHash();
        
    }
    computeHash() {
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class CryptoBlockchain {

    constructor() {
        this.blockchain = [this.StartGenesisBlock()];
    }
    StartGenesisBlock() {
        return new CryptoBlock(0, Date.now(), "Genesis Block", "0" );
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
        this.checkChainValidity();
        
    }
    checkChainValidity() {
        for(let i = 1; 1 <= this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i -1];

            if(currentBlock.hash !== currentBlock.computeHash() | currentBlock.precedingHash !== precedingBlock.hash) {
                return console.log("Blockchain Invalid");
            }
            else {
                
                return console.log("Blockchain is valid");
            }

            
        }
    }
    
}

let smashingCoin = new CryptoBlockchain();
smashingCoin.addNewBlock(new CryptoBlock(1, Date.now(), {sender: "David", recipient: "Ashley", quantity: 100}));
console.log(JSON.stringify(smashingCoin,  null, 4));
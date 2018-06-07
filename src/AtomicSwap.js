
class NotImplementedError extends Error{
    constructor(){
        super("Not implemented error");
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

class AtomicSwap{

    /**
     *
     * @param {string} privateKey - privateKey for signing transactions
     * @param {string} secretHash - hash of secret string (ripemd160(hash256(secret)))
     * @param {string} from - owner of funds
     * @param {string} to - address of the participant
     * @param {int} refundTime - time remaining to refund will be available
     * @param {float} amount - amount of tokens to transfer
     * @param {string=} asset - tokens to transfer
     */
    constructor(privateKey, from, to, secretHash, refundTime,  amount, asset){
        if(this.constructor === AtomicSwap)
            throw Error("You can't instantiate AtomicSwap class because it's abstract");

        this.privateKey = privateKey;
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.asset = asset;
        this.secretHash = secretHash;
        this.refundTime = refundTime;
    }

    /**
     * Initiate atomic swap
     */
    initiate(){
        throw NotImplementedError();
    }


    /**
     * Participate to atomic swap
     */
    participate(){
        throw NotImplementedError();
    }

    /**
     * Redeem funds with given secret
     * @param {string} secret - secret string used for swap initiating
     */
    redeem(secret){
        throw NotImplementedError();
    }

    /**
     * Refund funds of swap to transactions' initiator
     */
    refund(){
        throw NotImplementedError();
    }

    /**
     * Fetch swap based on transaction hash or parameters of swap
     * @param {string=} transactionHash - transaction hash of the operation on swap
     */
    fetchSwap(transactionHash){
        throw NotImplementedError();
    }

}

export default AtomicSwap;
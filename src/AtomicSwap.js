
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

    constructor(privateKey){
        if(this.constructor === AtomicSwap)
            throw Error("You can't instantiate AtomicSwap class because it's abstract");

        this.privateKey = privateKey;
    }

    /**
     * Initiate atomic swap
     * @param {int} refundTime - time remaining to refund will be available
     * @param {string} secretHash - hash of secret string (ripemd160(hash256(secret)))
     * @param {string} address - address of the participant
     * @param {float} amount - amount of tokens to transfer
     * @param {string=} asset - tokens to transfer
     */
    initiate(refundTime, secretHash, address, amount, asset){
        throw NotImplementedError();
    }


    /**
     * Participate to atomic swap
     * @param {int} refundTime - time remaining to refund will be available
     * @param {string} secretHash - hash of secret string (ripemd160(hash256(secret)))
     * @param {string} address - address of the participant
     * @param {float} amount - amount of tokens to transfer
     * @param {string=} asset - tokens to transfer
     */
    participate(refundTime, secretHash, address, amount, asset){
        throw NotImplementedError();
    }

    /**
     * Redeem funds with given secret
     * @param {string} secret - secret string used for swap initiating
     * @param {string} from  - address of swap transaction initiator
     */
    redeem(secret, from){
        throw NotImplementedError();
    }

    /**
     * Refund funds of swap to transactions' initiator
     * @param secretHash - hash of secret string (ripemd160(hash256(secret)))
     * @param to - address of the swap transaction participant
     */
    refund(secretHash, to){
        throw NotImplementedError();
    }

}

export default AtomicSwap;
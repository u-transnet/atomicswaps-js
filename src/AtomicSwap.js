
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
     * @param {string} account - initiator of action
     * @param {string} privateKey - privateKey for signing transactions
     * @param {string} host - url of host node
     * @param {string} networkType - type of the network
     * @param {string} secretHash - hash of secret string (ripemd160(hash256(secret)))
     * @param {string} from - owner of funds
     * @param {string} to - address of the participant
     * @param {int} refundTime - time remaining to refund will be available
     * @param {float} amount - amount of tokens to transfer
     * @param {string=} asset - tokens to transfer
     */
    constructor(account, privateKey, host, networkType,
                from, to, secretHash, refundTime, amount, asset) {
        if(this.constructor === AtomicSwap)
            throw Error("You can't instantiate AtomicSwap class because it's abstract");

        this.account = account;
        this.privateKey = privateKey;
        this.host = host;
        this.networkType = networkType;

        this.from = from;
        this.to = to;
        this.amount = amount;
        this.asset = asset;
        this.secretHash = secretHash;
        this.refundTime = refundTime;
    }

    /**
     * Initiate atomic swap
     * @param callback - function that called with (transactionData, error) params
     */
    initiate(callback) {
        throw NotImplementedError();
    }


    /**
     * Participate to atomic swap
     * @param callback - function that called with (transactionData, error) params
     */
    participate(callback) {
        throw NotImplementedError();
    }

    /**
     * Redeem funds with given secret
     * @param {string} secret - secret string used for swap initiating
     * @param callback - function that called with (transactionData, error) params
     */
    redeem(secret, callback) {
        throw NotImplementedError();
    }

    /**
     * Refund funds of swap to transactions' initiator
     * @param callback - function that called with (transactionData, error) params
     */
    refund(callback) {
        throw NotImplementedError();
    }

    /**
     * Fetch swap based on transaction hash or parameters of swap
     * @param {string=} transactionHash - transaction hash of the operation on swap
     * @param callback - function that called with (state: {secret: string, refunded: bool}, diffs: [], error) params
     */
    auditSwap(transactionHash, callback) {
        throw NotImplementedError();
    }

}

export default AtomicSwap;
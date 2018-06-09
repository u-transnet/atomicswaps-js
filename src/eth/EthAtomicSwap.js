import AtomicSwap from "../AtomicSwap";
import Engine from "./Engine";
import crypto from "../crypto";

class EthAtomicSwap extends AtomicSwap {

    static TYPE_INITIATOR = 1;
    static TYPE_PARTICIPANT = 2;

    constructor(account, privateKey, host, networkType,
                from, to, secretHash, refundTime, amount, asset) {
        super(account, privateKey, host, networkType, from, to, secretHash, refundTime, amount, asset);
        this.engine = new Engine(account, privateKey, host, networkType);
    }

    initiate(callback) {
        this.engine.execute(
            "initiate",
            this.amount,
            this.asset,
            200000,
            callback,
            this.refundTime,
            this.secretHash,
            this.to,
            EthAtomicSwap.TYPE_INITIATOR
        )
    }

    participate(callback) {
        this.engine.execute(
            "participate",
            this.amount,
            this.asset,
            200000,
            callback,
            this.refundTime,
            this.secretHash,
            this.to,
            EthAtomicSwap.TYPE_PARTICIPANT
        )
    }

    redeem(secret, callback) {
        this.engine.execute(
            "redeem",
            undefined,
            this.asset,
            200000,
            callback,
            "0x" + crypto.hexlify(secret),
            this.from
        )
    }

    refund(callback) {
        this.engine.execute(
            "refund",
            undefined,
            this.asset,
            200000,
            callback,
            this.secretHash,
            this.to
        )
    }

}

export default EthAtomicSwap;
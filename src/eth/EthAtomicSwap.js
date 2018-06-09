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

    _fetchSwapEvent(eventName, callback) {
        this.engine.fetchEvent(eventName, {
            filter: {
                _hashedSecret: this.secretHash,
                _from: this.from,
                _to: this.to
            },
            fromBlock: 0,
            toBlock: "latest"
        }, (err, events) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (events.length === 0) {
                callback(null, null);
                return;
            }

            callback(null, events[0])
        });
    }

    auditSwap(transactionHash, callback) {
        this._fetchSwapEvent("Initiated", (err, event) => {
            if (!event) {
                callback(null, [], err);
                return;
            }

            let data = event.returnValues;
            let diffs = [];

            if (data._refundTime !== this.refundTime.toString())
                diffs.push({
                    'name': 'refundTime',
                    'value': data._refundTime,
                    'localValue': this.refundTime
                });

            let value = this.engine.calculateAmount(this.amount, this.asset);
            if (data._value !== value)
                diffs.push({
                    'name': 'value',
                    'value': data._value,
                    'localValue': value
                });

            this._fetchSwapEvent("Redeemed", (err, event) => {
                if (err) {
                    callback(null, [], err);
                    return;
                }

                if (event) {
                    callback({
                        secret: event.returnValues._secret,
                        refunded: false
                    }, diffs, null)
                } else
                    this._fetchSwapEvent("Refunded", (err, event) => {
                        if (err) {
                            callback(null, [], err);
                            return;
                        }

                        if (event)
                            callback({
                                secret: null,
                                refunded: true
                            }, diffs, null);
                        else
                            callback({
                                secret: null,
                                refunded: false,
                            }, diffs, null);
                    })
            });
        });
    }

}

export default EthAtomicSwap;
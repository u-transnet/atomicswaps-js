import Web3 from "web3"
import AbiConfig from "./abi"

class Engine {

    static CONTRACT_ADDRESS_MAP = {
        test: '0xea305b9ff5f3e105aa68a5ca60e19098c361cbf7'
    };

    constructor(account, privateKey, host, networkType) {
        this.web3 = new Web3(new Web3.providers.WebsocketProvider(host));
        this.web3.defaultAccount = account;

        this.contract = new this.web3.eth.Contract(AbiConfig);
        this.privateKey = privateKey;
        this.networkType = networkType;
    }

    execute(name, amount, asset, gas, callback, ...params) {
        let contractMethod = this.contract.methods[name](...params);

        let tx = {
            data: contractMethod.encodeABI(),
            to: Engine.CONTRACT_ADDRESS_MAP[this.networkType],
            gas
        };

        if (amount)
            tx.value = this.web3.utils.toWei(amount.toString(), asset);

        this.web3.eth.accounts.signTransaction(tx, this.privateKey).then(signed => {
            let tran = this.web3.eth.sendSignedTransaction(signed.rawTransaction);

            tran.on('confirmation', (confirmationNumber, receipt) => {
                console.log('confirmation: ' + confirmationNumber);
            });

            tran.on('receipt', receipt => {
                callback(receipt, null);
            });

            tran.on('error', (error) => {
                callback(null, error);
            });
        });
    }

}

export default Engine;
import hash from "hash.js";

class Crypto {

    static calculateSecretHash(secret) {
        return hash.ripemd160().update(hash.sha256().update(secret).digest()).digest("hex");
    }

    static hexlify(value) {
        return hash.sha256().update(value).digest("hex");
    }

}


export default Crypto;

class customerror extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}

const createcustomerror = (msg: string) => {
    return new customerror(msg);
}

export { createcustomerror, customerror };
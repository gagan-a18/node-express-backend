
class ErrorRequest extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default ErrorRequest;

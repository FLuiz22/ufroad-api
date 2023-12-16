/**
 * Represents an error thrown by the server with the intention of signaling an HTTP error code.
 */
export class ServerError extends Error {
    /**
     * @param {string} message The error message
     * @param {number} statusCode The HTTP status code for the response
     */
    constructor(message, statusCode) {
        super(message);
        /** @type {number} */
        this.statusCode = statusCode ?? 500;
    }
}

/**
 * Error used for when the server cannot find the requested resource.
 */
export class ErrorNotFound extends ServerError {
    constructor(message) {
        super(message, 404);
    }
}

/**
 * Error used for when the client tries to create a conflicting resource.
 */
export class ErrorAlreadyExists extends ServerError {
    constructor(message) {
        super(message, 400);
    }
}
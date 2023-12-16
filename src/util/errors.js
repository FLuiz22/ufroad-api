export class ErrorNotFound extends Error {

}

export class ErrorAlreadyExists extends Error {
    
}

/**
 * Error used for when tries to access the system and haven't authorization.
 */
export class ErrorUnauthorized extends Error {
    constructor(message) {
        super(message, 401);
    }
}
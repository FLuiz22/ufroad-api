import bcrypt from "bcrypt";

const SALT_ROUNDS = 2;

/**
 * Hashes a plain text password.
 * @param {string} plainPassword
 * @returns {Promise<string>}
 */
export async function hashPassword(plainPassword) {
    return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Checks if a plain text password matches with the password hash.
 * @param {string} plainPassword
 * @param {string} hashed
 * @returns {Promise<boolean>}
 */
export async function checkPassword(plainPassword, hashed) {
    return await bcrypt.compare(plainPassword, hashed);
}

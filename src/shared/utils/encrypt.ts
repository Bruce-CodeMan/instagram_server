import * as crypto from "crypto";

/**
 * Make salt
 * @returns string
 */
export function makeSalt(): string{
  return crypto.randomBytes(3).toString("base64")
}


/**
 * Encrypt the password
 * @param password 
 * @param salt 
 * @returns 
 */
export function encryptPassword(password: string, salt: string): string {
  if(!password || !salt) {
    return "";
  }
  const tempSalt = Buffer.from(salt, "base64")
  return (
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, "sha1").toString("base64")
  )
}
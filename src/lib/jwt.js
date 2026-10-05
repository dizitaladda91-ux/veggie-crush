import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const DEFAULT_SECRET = "veggiecrush_default_jwt_secret_dev_key";

function getSecretKey() {
  const secret = process.env.JWT_SECRET || DEFAULT_SECRET;
  return new TextEncoder().encode(secret);
}

/**
 * Signs a payload into a secure HS256 JWT string.
 * Works seamlessly in Edge middleware and Node.js runtime.
 */
export async function signJWT(payload, expiresIn = "7d") {
  const key = getSecretKey();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);
}

/**
 * Verifies and decodes a JWT token.
 * Returns decoded payload or null if invalid/expired.
 */
export async function verifyJWT(token) {
  try {
    if (!token) return null;
    const key = getSecretKey();
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Hashes a plaintext password using bcryptjs.
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * Compares plaintext password with stored bcrypt hash.
 */
export async function comparePassword(password, hash) {
  if (!password || !hash) return false;
  return await bcrypt.compare(password, hash);
}

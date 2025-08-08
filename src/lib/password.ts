import * as argon2 from 'argon2';

/**
 * Hash a password using Argon2id algorithm
 * @param password - The plain text password to hash
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 3,
    parallelism: 1,
    hashLength: 32,
  });
}

/**
 * Verify a password against a hash
 * Supports both Argon2 and legacy bcrypt hashes
 * @param hash - The password hash
 * @param password - The plain text password to verify
 * @returns Whether the password matches
 */
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  // Check if it's an argon2 hash
  if (hash.startsWith('$argon2')) {
    return argon2.verify(hash, password);
  }

  // Legacy bcrypt hash
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
}

/**
 * Check if a password hash needs migration
 * @param hash - The password hash to check
 * @returns Whether the hash needs migration from bcrypt to argon2
 */
export function needsPasswordMigration(hash: string): boolean {
  return !hash.startsWith('$argon2');
}

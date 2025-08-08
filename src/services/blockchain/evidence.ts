// Blockchain evidence temporarily disabled for launch
export class BlockchainEvidence {
  static async storeEvidence(data: Record<string, unknown>) {
    return { hash: 'temp-hash', timestamp: new Date() };
  }

  static async verifyEvidence(hash: string) {
    return { valid: true, timestamp: new Date() };
  }
}

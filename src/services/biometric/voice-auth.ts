// Voice auth temporarily disabled for launch
export class VoiceAuthService {
  static async enrollVoice(userId: string, voiceData: unknown) {
    console.log('Voice enrollment:', userId);
    return { success: true, enrollmentId: 'temp-id' };
  }

  static async verifyVoice(userId: string, voiceData: unknown) {
    console.log('Voice verification:', userId);
    return { verified: true, confidence: 0.95 };
  }
}

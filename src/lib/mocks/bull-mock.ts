// Simple mock for Bull queue system to prevent import errors
export interface Job<T = any> {
  id: string | number;
  data: T;
  processedOn?: number;
  timestamp: number;
}

export interface QueueOptions {
  redis?: any;
  defaultJobOptions?: any;
}

// Mock Bull class
class MockBull {
  private name: string;
  private options: QueueOptions;
  private processors: Array<(job: Job) => Promise<any>> = [];

  constructor(name: string, options: QueueOptions = {}) {
    this.name = name;
    this.options = options;
  }

  // Mock methods
  async add(jobName: string, data: any, options?: any) {
    console.log(`[MOCK] Adding job ${jobName} to queue ${this.name}:`, data);
    return { id: Date.now(), data };
  }

  process(processor: (job: Job) => Promise<any>) {
    console.log(`[MOCK] Setting up processor for queue ${this.name}`);
    this.processors.push(processor);
  }

  on(event: string, handler: (...args: any[]) => void) {
    console.log(`[MOCK] Setting up event listener for ${event} on queue ${this.name}`);
  }

  async getWaitingCount() { return 0; }
  async getActiveCount() { return 0; }
  async getCompletedCount() { return 0; }
  async getFailedCount() { return 0; }
  async getDelayedCount() { return 0; }
  async isPaused() { return false; }

  async empty() {
    console.log(`[MOCK] Emptying queue ${this.name}`);
  }

  async pause() {
    console.log(`[MOCK] Pausing queue ${this.name}`);
  }

  async resume() {
    console.log(`[MOCK] Resuming queue ${this.name}`);
  }
}

// Export as default (Bull) and named export (Job)
export default MockBull;
export { MockBull as Bull };
export type { Job };
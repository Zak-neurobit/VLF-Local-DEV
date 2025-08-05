// Mock BullMQ Queue for local testing without Redis dependency

export interface Job<T = any> {
  id: string;
  name: string;
  data: T;
  opts: any;
  progress(value: number): Promise<void>;
  log(message: string): void;
  returnvalue?: any;
  attemptsMade: number;
  timestamp: number;
}

export interface QueueOptions {
  connection?: any;
  defaultJobOptions?: {
    removeOnComplete?: boolean | number;
    removeOnFail?: boolean | number;
    attempts?: number;
    backoff?: {
      type: string;
      delay: number;
    };
  };
}

export class Queue {
  private jobs: Map<string, Job> = new Map();
  private processors: Array<(job: Job) => Promise<any>> = [];
  public name: string;

  constructor(name: string, options?: QueueOptions) {
    this.name = name;
    console.log(`[BullMQ Mock] Created queue: ${name}`);
  }

  async add(name: string, data: any, opts: any = {}): Promise<Job> {
    const job: Job = {
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      data,
      opts,
      progress: async (value: number) => {
        console.log(`[BullMQ Mock] Job ${job.id} progress: ${value}%`);
      },
      log: (message: string) => {
        console.log(`[BullMQ Mock] Job ${job.id} log: ${message}`);
      },
      attemptsMade: 0,
      timestamp: Date.now(),
    };

    this.jobs.set(job.id, job);
    console.log(`[BullMQ Mock] Added job ${job.id} to queue ${this.name}`);

    // Process job immediately in mock
    setTimeout(() => this.processJob(job), 100);

    return job;
  }

  private async processJob(job: Job): Promise<void> {
    if (this.processors.length === 0) return;

    try {
      for (const processor of this.processors) {
        const result = await processor(job);
        job.returnvalue = result;
      }
      console.log(`[BullMQ Mock] Job ${job.id} completed successfully`);
    } catch (error) {
      console.error(`[BullMQ Mock] Job ${job.id} failed:`, error);
    }
  }

  async process(processor: (job: Job) => Promise<any>): Promise<void> {
    this.processors.push(processor);
    console.log(`[BullMQ Mock] Registered processor for queue ${this.name}`);
  }

  async pause(): Promise<void> {
    console.log(`[BullMQ Mock] Queue ${this.name} paused`);
  }

  async resume(): Promise<void> {
    console.log(`[BullMQ Mock] Queue ${this.name} resumed`);
  }

  async empty(): Promise<void> {
    this.jobs.clear();
    console.log(`[BullMQ Mock] Queue ${this.name} emptied`);
  }

  async clean(grace: number, type: string): Promise<void> {
    console.log(`[BullMQ Mock] Queue ${this.name} cleaned (grace: ${grace}, type: ${type})`);
  }

  async close(): Promise<void> {
    console.log(`[BullMQ Mock] Queue ${this.name} closed`);
  }

  async getJob(id: string): Promise<Job | null> {
    return this.jobs.get(id) || null;
  }

  async getJobs(types: string[]): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getWaiting(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getActive(): Promise<Job[]> {
    return [];
  }

  async getCompleted(): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.returnvalue !== undefined);
  }

  async getFailed(): Promise<Job[]> {
    return [];
  }

  on(event: string, handler: (...args: any[]) => void): void {
    console.log(`[BullMQ Mock] Registered event handler for '${event}' on queue ${this.name}`);
  }

  off(event: string, handler: (...args: any[]) => void): void {
    console.log(`[BullMQ Mock] Removed event handler for '${event}' on queue ${this.name}`);
  }
}

export default Queue;
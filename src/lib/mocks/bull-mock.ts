// Mock Bull Queue for local testing without Redis dependency

export interface Job<T = any> {
  id: string;
  data: T;
  opts: any;
  progress(value: number): Promise<void>;
  log(message: string): void;
  returnvalue?: any;
  attemptsMade: number;
  timestamp: number;
  name?: string;
}

export interface QueueSettings {
  stalledInterval?: number;
  maxStalledCount?: number;
}

// Namespace for Bull types
export namespace Bull {
  export interface QueueOptions {
    redis?: any;
    prefix?: string;
    defaultJobOptions?: {
      removeOnComplete?: boolean | number;
      removeOnFail?: boolean | number;
      attempts?: number;
      delay?: number;
      repeat?: {
        cron?: string;
        tz?: string;
      };
    };
  }

  export interface RepeatOptions {
    cron?: string;
    tz?: string;
    startDate?: Date | string | number;
    endDate?: Date | string | number;
    limit?: number;
    every?: number;
    count?: number;
  }
}

export default class Bull<T = any> {
  private jobs: Map<string, Job<T>> = new Map();
  private processors: Array<(job: Job<T>) => Promise<any>> = [];
  public name: string;
  private settings: QueueSettings;

  constructor(name: string, redisConfig?: any, settings?: QueueSettings) {
    this.name = name;
    this.settings = settings || {};
    console.log(`[Bull Mock] Created queue: ${name}`);
  }

  async add(name: string, data: T, opts: any = {}): Promise<Job<T>> {
    const job: Job<T> = {
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      data,
      opts,
      progress: async (value: number) => {
        console.log(`[Bull Mock] Job ${job.id} progress: ${value}%`);
      },
      log: (message: string) => {
        console.log(`[Bull Mock] Job ${job.id} log: ${message}`);
      },
      attemptsMade: 0,
      timestamp: Date.now(),
    };

    this.jobs.set(job.id, job);
    console.log(`[Bull Mock] Added job ${job.id} to queue ${this.name}`);

    // Process job immediately in mock
    setTimeout(() => this.processJob(job), 100);

    return job;
  }

  private async processJob(job: Job<T>): Promise<void> {
    if (this.processors.length === 0) return;

    try {
      for (const processor of this.processors) {
        const result = await processor(job);
        job.returnvalue = result;
      }
      console.log(`[Bull Mock] Job ${job.id} completed successfully`);
    } catch (error) {
      console.error(`[Bull Mock] Job ${job.id} failed:`, error);
    }
  }

  process(processor: (job: Job<T>) => Promise<any>): void;
  process(concurrency: number, processor: (job: Job<T>) => Promise<any>): void;
  process(name: string, processor: (job: Job<T>) => Promise<any>): void;
  process(name: string, concurrency: number, processor: (job: Job<T>) => Promise<any>): void;
  process(...args: any[]): void {
    let processor: (job: Job<T>) => Promise<any>;
    
    if (typeof args[0] === 'function') {
      processor = args[0];
    } else if (typeof args[1] === 'function') {
      processor = args[1];
    } else if (typeof args[2] === 'function') {
      processor = args[2];
    } else {
      processor = args[args.length - 1];
    }

    this.processors.push(processor);
    console.log(`[Bull Mock] Registered processor for queue ${this.name}`);
  }

  async pause(): Promise<void> {
    console.log(`[Bull Mock] Queue ${this.name} paused`);
  }

  async resume(): Promise<void> {
    console.log(`[Bull Mock] Queue ${this.name} resumed`);
  }

  async empty(): Promise<void> {
    this.jobs.clear();
    console.log(`[Bull Mock] Queue ${this.name} emptied`);
  }

  async clean(grace: number, type: string): Promise<void> {
    console.log(`[Bull Mock] Queue ${this.name} cleaned (grace: ${grace}, type: ${type})`);
  }

  async close(): Promise<void> {
    console.log(`[Bull Mock] Queue ${this.name} closed`);
  }

  async getJob(id: string): Promise<Job<T> | null> {
    return this.jobs.get(id) || null;
  }

  async getJobs(types: string[]): Promise<Job<T>[]> {
    return Array.from(this.jobs.values());
  }

  async getWaiting(): Promise<Job<T>[]> {
    return Array.from(this.jobs.values());
  }

  async getActive(): Promise<Job<T>[]> {
    return [];
  }

  async getCompleted(): Promise<Job<T>[]> {
    return Array.from(this.jobs.values()).filter(job => job.returnvalue !== undefined);
  }

  async getFailed(): Promise<Job<T>[]> {
    return [];
  }

  async getWaitingCount(): Promise<number> {
    return this.jobs.size;
  }

  async getActiveCount(): Promise<number> {
    return 0;
  }

  async getCompletedCount(): Promise<number> {
    return Array.from(this.jobs.values()).filter(job => job.returnvalue !== undefined).length;
  }

  async getFailedCount(): Promise<number> {
    return 0;
  }

  async getDelayedCount(): Promise<number> {
    return 0;
  }

  async isPaused(): Promise<boolean> {
    return false;
  }

  on(event: string, handler: (...args: any[]) => void): void {
    console.log(`[Bull Mock] Registered event handler for '${event}' on queue ${this.name}`);
    
    // Simulate some events
    if (event === 'completed') {
      // Mock completed events
    } else if (event === 'failed') {
      // Mock failed events
    }
  }

  off(event: string, handler: (...args: any[]) => void): void {
    console.log(`[Bull Mock] Removed event handler for '${event}' on queue ${this.name}`);
  }
}
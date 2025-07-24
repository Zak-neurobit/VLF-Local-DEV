// Next.js instrumentation - runs before the server starts
export async function register() {
  // Log when instrumentation runs
  if (process.env.NODE_ENV === 'development') {
    console.log('[Instrumentation] Starting registration...');
  }
  
  // Fix ReadableStream issues ONLY in Node.js environment
  // This prevents the "Cannot enqueue after closing" errors
  if (typeof globalThis !== 'undefined' && !globalThis.window) {
    try {
      // Only patch if we're in Node.js and ReadableStream exists
      if (typeof ReadableStreamDefaultController !== 'undefined') {
        patchReadableStream();
      }
    } catch (error) {
      console.error('[Instrumentation] Failed to patch ReadableStream:', error);
    }
  }
  
  // Sentry initialization could go here when re-enabled
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[Instrumentation] Registration complete');
  }
}

function patchReadableStream() {
  // Store original methods
  const originalProto = ReadableStreamDefaultController.prototype;
  const originalEnqueue = originalProto.enqueue;
  const originalClose = originalProto.close;
  const originalError = originalProto.error;

  // Create safe wrapper for enqueue
  Object.defineProperty(originalProto, 'enqueue', {
    value: function (chunk: any) {
      try {
        // Access internal state safely
        const controller = this as any;
        const stream = controller._controlledReadableStream;
        
        // Check if we can safely enqueue
        if (stream && !controller._closeRequested && controller._started) {
          return originalEnqueue.apply(this, arguments);
        }
      } catch (error) {
        // Log but don't throw - prevents server crashes
        if (process.env.NODE_ENV === 'development') {
          console.warn('[ReadableStream] Enqueue error handled:', error);
        }
      }
    },
    writable: true,
    configurable: true
  });

  // Create safe wrapper for close
  Object.defineProperty(originalProto, 'close', {
    value: function () {
      try {
        const controller = this as any;
        
        // Only close if not already closed/closing
        if (!controller._closeRequested && controller._controlledReadableStream) {
          return originalClose.apply(this, arguments);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[ReadableStream] Close error handled:', error);
        }
      }
    },
    writable: true,
    configurable: true
  });

  // Create safe wrapper for error
  Object.defineProperty(originalProto, 'error', {
    value: function (e: any) {
      try {
        const controller = this as any;
        
        // Only error if stream is in valid state
        if (controller._controlledReadableStream && !controller._closeRequested) {
          return originalError.apply(this, arguments);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[ReadableStream] Error method error handled:', error);
        }
      }
    },
    writable: true,
    configurable: true
  });
}

export async function onRequestError(
  error: Error,
  request: Request,
  context: {
    routerKind: 'App Router' | 'Pages Router';
    routePath: string;
    routeType: 'render' | 'route' | 'middleware';
  }
): Promise<void> {
  // Enhanced error logging
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    path: context.routePath,
    type: context.routeType,
    router: context.routerKind,
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString()
  };
  
  // Special handling for ReadableStream errors
  if (error.message?.includes('ReadableStreamDefaultController')) {
    console.warn('[ReadableStream Error]', {
      ...errorInfo,
      note: 'This error has been patched but still occurred'
    });
    return; // Don't propagate ReadableStream errors
  }
  
  // Log all other errors
  if (process.env.NODE_ENV === 'development') {
    console.error('[Request Error]', errorInfo);
  } else {
    // In production, log less verbose info
    console.error('[Request Error]', {
      message: error.message,
      path: context.routePath,
      timestamp: errorInfo.timestamp
    });
  }
  
  // Here you could send to Sentry when re-enabled
}
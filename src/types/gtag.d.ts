declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Gtag.ControlParams | Gtag.EventParams | Gtag.ConfigParams | Date
    ) => void;
    dataLayer?: Array<unknown>;
  }
}

declare namespace Gtag {
  interface ConfigParams {
    page_path?: string;
    page_title?: string;
    page_location?: string;
    send_page_view?: boolean;
    [key: string]: any;
  }

  interface EventParams {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }

  interface ControlParams {
    groups?: string | string[];
    send_to?: string | string[];
    event_callback?: () => void;
    event_timeout?: number;
  }
}

export {};
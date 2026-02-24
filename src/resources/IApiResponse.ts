/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse {
  data?: {
    data?: any;
    message?: string;
    success?: boolean;
  };
  error?: any;
}

export type { ApiResponse as default };

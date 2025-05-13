export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface ErrorResponse extends ApiResponse {
  status: 'error';
  error: string;
  code?: number;
}

export interface SuccessResponse<T> extends ApiResponse<T> {
  status: 'success';
  data: T;
} 
export interface ApiListResponse<T> {
  status: number;
  message: string;
  data: {
    list: T;
  };
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

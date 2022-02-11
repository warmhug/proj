export interface IQueryParams {
  pageSize?: number;
  pageNum?: number;
}

export interface IResponse<D> {
  success: boolean;
  code?: string;
  message?: string;
  data?: D;
  body?: any;
  meta?: any;
  error?: Error;
}

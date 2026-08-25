export interface HttpResponse<B> {
  body: B | string;
  statusCode: HttpStatusCode;
}

export interface HttpRequest<T> {
  params?: any;
  headers?: any;
  body?: T;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

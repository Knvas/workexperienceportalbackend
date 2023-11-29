export interface ResponseWrapperDto<T> {

  statusCode: number;

  statusMessage?: string;

  // message?: string;

  errorMessages?: string[];

  data?: T;

}
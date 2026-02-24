export class ApiError extends Error {
  statusCode: number;
  errorMessages: { path?: string; message: string }[];

  constructor(
    statusCode: number,
    message: string,
    errorMessages: { path?: string; message: string }[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessages = errorMessages;
  }
}

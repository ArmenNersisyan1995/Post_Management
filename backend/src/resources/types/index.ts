import { StatusCodes } from "http-status-codes";


export type LogLevel = 'info' | 'warn' | 'error';

export interface APIError {
  message: string,
  statusCode: number,
  stack?: string | undefined;
  name: string;
}

export class ApiError extends Error {
  public readonly message: string;
  public readonly name: string;
  public readonly statusCode: number;
  public readonly stack: string | undefined;


  constructor(error: APIError) {
    super();

    const { message, statusCode, name, stack } = error;
    const errorCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    this.stack = stack;
    this.message = message;
    this.statusCode = errorCode;
    this.name = name;
  }
}

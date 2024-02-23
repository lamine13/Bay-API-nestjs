import { ConflictException, HttpStatus } from '@nestjs/common';

class Params{
    message: string;
    data?: any;
}
export class ResponseData extends Params {
  status: number;
}
export class ResponseBody {
  static error(error: any, message: string): ResponseData {
    const errorMessage =
      error instanceof ConflictException
        ? (error.getResponse() as { message: string }).message
        : error.message.replace(/^ConflictException: /, '') || message;
    const response: ResponseData = {
      message: errorMessage,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
    return response;
  }
  static success(param: Params): ResponseData {
    const response: ResponseData = {
      message: param.message,
      status: HttpStatus.OK,
      data: param.data,
    };
    return response;
  }
  static notFound(message: string): ResponseData {
    const response: ResponseData = {
      message: message,
      status: HttpStatus.NOT_FOUND,
    };
    return response;
  }
  static conflict(message: string): ResponseData {
    const response: ResponseData = {
      message: message,
      status: HttpStatus.CONFLICT,
    };
    return response;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return ' Mohamadou lamine gaye!';
  }
}

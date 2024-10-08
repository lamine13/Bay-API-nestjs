import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('home')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('/hello')
  async getI18nHello(@I18n() i18n: I18nContext) {
    return await i18n.t('test.HELLO');
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './features/user/role/role.module';
import { AdminModule } from './features/user/admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './config/validation';
import { configEnv } from './config/configuration';
import MongooseConfig from './config/databaseconfig';
import appConfig from './config/app-config';
import { VendeursModule } from './features/user/vendeurs/vendeurs.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/lang/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: configEnv(process.env.NODE_ENV),
      isGlobal: true,
      load: [appConfig, MongooseConfig],
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('uri'),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    RoleModule,
    AdminModule,
    VendeursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

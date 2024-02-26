import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './entities/admin.entity';
import { RoleModule } from '../role/role.module';
import { GenerateCodeMatricule } from 'src/utils/generate/generate_matric';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Admin',
        schema: AdminSchema,
      }
    ]),
    RoleModule,
    
  ],
  controllers: [AdminController],
  providers: [AdminService,GenerateCodeMatricule],
})
export class AdminModule {}

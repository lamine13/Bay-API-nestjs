import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './entities/admin.entity';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';

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
  providers: [AdminService],
})
export class AdminModule {}

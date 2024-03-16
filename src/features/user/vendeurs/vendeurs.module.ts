import { Module } from '@nestjs/common';
import { VendeursService } from './vendeurs.service';
import { VendeursController } from './vendeurs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VendeurShema } from './entities/vendeur.entity';
import { RoleModule } from '../role/role.module';
import { GenerateCodeMatricule } from 'src/utils/generate/generate_matric';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Vendeur',
        schema: VendeurShema,
      },
    ]),
    RoleModule,
  ],
  controllers: [VendeursController],
  providers: [VendeursService, GenerateCodeMatricule],
})
export class VendeursModule {}

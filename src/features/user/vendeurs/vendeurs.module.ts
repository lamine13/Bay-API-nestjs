import { Module } from '@nestjs/common';
import { VendeursService } from './vendeurs.service';
import { VendeursController } from './vendeurs.controller';

@Module({
  controllers: [VendeursController],
  providers: [VendeursService],
})
export class VendeursModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { VendeursController } from './vendeurs.controller';
import { VendeursService } from './vendeurs.service';

describe('VendeursController', () => {
  let controller: VendeursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendeursController],
      providers: [VendeursService],
    }).compile();

    controller = module.get<VendeursController>(VendeursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

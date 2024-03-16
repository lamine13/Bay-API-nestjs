import { Test, TestingModule } from '@nestjs/testing';
import { VendeursController } from './vendeurs.controller';
import { VendeursService } from './vendeurs.service';
import { vendeurMock } from './mocks/vendeur.mock';
import { GenerateCodeMatricule } from 'src/utils/generate/generate_matric';

describe('VendeursController', () => {
  let vendeurController: VendeursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendeursController],
      providers: [VendeursService, GenerateCodeMatricule],
    }).compile();

    vendeurController = module.get<VendeursController>(VendeursController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
  describe('findAll', () => {
    it('should return an array of sells', async () => {
      const result = vendeurMock;
      jest.spyOn(vendeurController.findAll()).toBe(result);
    });
  });
});

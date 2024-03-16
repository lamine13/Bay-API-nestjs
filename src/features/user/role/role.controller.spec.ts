import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

import { roleMock } from './mocks/role.mock';

import { GenerateCodeRole } from 'src/utils/generate/generate_code';
import { ResponseBody, ResponseData } from 'src/utils/response-body';
import { Role } from './entities/role.entity';

jest.mock('./mocks/role.service.mock.ts');
describe('RoleController', () => {
  let controller: RoleController;
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [RoleService, GenerateCodeRole, ResponseBody, ResponseData],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
  describe('findOne', () => {
    describe('when All roles is called ', () => {
      let role;
      beforeEach(async () => {
        role = await controller.findOne(roleMock()._id);
      });
      test('then itshouls call roleservice', () => {
        expect(service.findOne).toBeCalledWith(roleMock()._id);
      });
    });
  });
});

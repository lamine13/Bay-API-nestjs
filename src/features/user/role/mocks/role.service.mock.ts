import { roleMock } from './role.mock';

export const roleServiceMock = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([roleMock]),
  findOne: jest.fn().mockResolvedValue(roleMock()),
  update: jest.fn().mockResolvedValue(roleMock()),
  delete: jest.fn().mockResolvedValue(roleMock()),
});

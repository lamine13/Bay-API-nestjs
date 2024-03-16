import { any } from 'joi';
import { Role } from '../entities/role.entity';

export const roleMock = (): Role => {
  return {
    name: 'admin',
    code: 'code221',
    _id: [],
  };
};

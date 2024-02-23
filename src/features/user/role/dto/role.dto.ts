import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../entities/role.entity';

export class CreateRoleDto {
  @IsString({ message: 'le nom du role doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le nom du role est requis' })
  name: string;
}

export class UpdateRoleDto {
  @IsString({ message: 'le nom du role doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le nom du role est requis' })
  name: string;
}
export class RoleFields {
  name: string;

  constructor(role: Role) {
    this.name = role.name;
  }
}

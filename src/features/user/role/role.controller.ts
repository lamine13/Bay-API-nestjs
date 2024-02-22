import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ConflictException,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, RoleFields } from './dto/role.dto';
import { UpdateRoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<{ message: string; status: number; data?: Role }> {
    try {
      const { name } = createRoleDto;
      const roleExist = await this.roleService.findRoleByName(name);
      if (roleExist) {
        return {
          message: `Le role ${name} existe deja `,
          status: HttpStatus.CONFLICT,
        };
      }
      const newRole: Role = await this.roleService.create(createRoleDto);
      return {
        message: `le role ${name} a ete cree avec succes`,
        status: HttpStatus.CREATED,
        data: newRole,
      };
    } catch (error) {
      const errorMessage =
        error instanceof ConflictException
          ? (error.getResponse() as { message: string }).message
          : error.message.replace(/^ConflictException: /, '') ||
            "Erreur lors de la creation d'un role";
      return {
        message: errorMessage,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get()
  async findAll(): Promise<{
    message: string;
    status: number;
    data?: RoleFields[];
  }> {
    try {
      const roles = await this.roleService.findAll();
      const responses = roles.map((role) => new RoleFields(role));
      return {
        message: `La liste des roles recuperer avec succes`,
        status: HttpStatus.OK,
        data: responses,
      };
    } catch (error) {
      const errorMessage =
        error instanceof ConflictException
          ? (error.getResponse() as { message: string }).message
          : error.message.replace(/^ConflictException: /, '') ||
            'Erreur lors de la recuperation des roles';
      return {
        message: errorMessage,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; status: number; data?: RoleFields | null }> {
    try {
      const role = await this.roleService.findOne(id);
      if (role) {
        return {
          message: `details role ${role.name}`,
          status: HttpStatus.OK,
          data: new RoleFields(role),
        };
      }
      return {
        message: `le role ${id} n'existe pas`,
        status: HttpStatus.NOT_FOUND,
      };
    } catch (error) {
      const errorMessage =
        error instanceof ConflictException
          ? (error.getResponse() as { message: string }).message
          : error.message.replace(/^ConflictException: /, '') ||
            'Erreur lors de la recuperation du role';
      return {
        message: errorMessage,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<{ message: string; status: number; data?: RoleFields | null }> {
    try {
      const roleExist = await this.roleService.findOne(id);
      if (!roleExist) {
        return {
          message: `Le role ${id} n'existe pas `,
          status: HttpStatus.NOT_FOUND,
        };
      }
      const { name } = updateRoleDto;

      const roleExistName = await this.roleService.findRoleByName(name);

      if (roleExistName) {
        
          return {
            message: `Le nom du role existe deja `,
            status: HttpStatus.CONFLICT,
          };
        
      }
      const newRole: Role = await this.roleService.update(id, updateRoleDto);
      return {
        message: `le role ${name} a ete MAJ avec succes`,
        status: HttpStatus.OK,
        data: newRole,
      };
    } catch (error) {
      const errorMessage =
        error instanceof ConflictException
          ? (error.getResponse() as { message: string }).message
          : error.message.replace(/^ConflictException: /, '') ||
            'Erreur lors de la mise a jour du role';
      return {
        message: errorMessage,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: string; statut: number; data?: RoleFields }> {
    try {
      const roleExist = await this.roleService.findOne(id);
      if (roleExist) {
        const deleteRole = await this.roleService.remove(id);

        return {
          message: `Le role a ete supprime avec succes  :) `,
          statut: HttpStatus.OK,
          data: deleteRole,
        };
      }
      return {
        message: `Ce role n'existe pas dans la base de donnees :( `,
        statut: HttpStatus.NOT_FOUND,
      };
    } catch (error) {
      const errorMessage =
        error instanceof ConflictException
          ? (error.getResponse() as { message: string }).message
          : error.message.replace(/^ConflictException: /, '') ||
            'Erreur lors de la suppression du role ! ';
      return {
        message: errorMessage,
        statut: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}

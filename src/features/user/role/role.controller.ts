import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, RoleFields } from './dto/role.dto';
import { UpdateRoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';
import { ResponseBody, ResponseData } from 'src/utils/response-body';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<ResponseData> {
    try {
      const { name } = createRoleDto;
      const roleExist = await this.roleService.findRoleByName(name);
      if (roleExist) {
        return ResponseBody.conflict(`Le role ${name} existe deja `);
      }
      const newRole: Role = await this.roleService.create(createRoleDto);
      return ResponseBody.success({
        data: newRole,
        message: `le role ${name} a ete cree avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(error, "Erreur lors de la creation d'un role");
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
      return ResponseBody.success({
        data: responses,
        message: `La liste des roles recuperer avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(
        error,
        'Erreur lors de la recuperation des roles',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData> {
    try {
      const role = await this.roleService.findOne(id);
      if (role) {
        return ResponseBody.success({
          data: new RoleFields(role),
          message: `details role ${role.name}`,
        });
      }
      return ResponseBody.notFound(`le role ${id} n'existe pas`);
    } catch (error) {
      return ResponseBody.error(
        error,
        "Erreur lors de la recuperation d'un role",
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<ResponseData> {
    try {
      const roleExist = await this.roleService.findOne(id);
      if (!roleExist) {
        return ResponseBody.notFound(`le role ${id} n'existe pas`);
      }
      const { name } = updateRoleDto;

      const roleExistName = await this.roleService.findRoleByName(name);

      if (roleExistName) {
        return ResponseBody.conflict(`le role ${id} n'existe deja`);
      }
      const newRole: Role = await this.roleService.update(id, updateRoleDto);
      return ResponseBody.success({
        data: newRole,
        message: `le role ${name} a ete MAJ avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(error, 'Erreur lors de la mise a jour du role');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseData> {
    try {
      const roleExist = await this.roleService.findOne(id);
      if (roleExist) {
        const deleteRole = await this.roleService.remove(id);

        return ResponseBody.success({
          data: deleteRole,
          message: `Le role a ete supprime avec succes  :) `,
        });
      }
      return ResponseBody.notFound(
        `Ce role n'existe pas dans la base de donnees :( `,
      );
    } catch (error) {
      return ResponseBody.error(
        error,
        'Erreur lors de la suppression du role ! ',
      );
    }
  }
}

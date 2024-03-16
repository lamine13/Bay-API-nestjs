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
import { GenerateCodeRole } from 'src/utils/generate/generate_code';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('users/roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly generateCodRole: GenerateCodeRole,
  ) {}
  @Post('store')
  async create(@Body() createRoleDto: CreateRoleDto): Promise<ResponseData> {
    try {
      const { name } = createRoleDto;
      const roleExist = await this.roleService.findRoleByName(name);
      const roleserv = this.generateCodRole.generate();

      if (roleExist) {
        return ResponseBody.conflict(`Le role ${name} existe deja `);
      }
      const body = {
        ...createRoleDto,
        code: roleserv,
      };
      const newRole: Role = await this.roleService.create(body);
      return ResponseBody.creation({
        data: newRole,
        message: `le role ${name} a ete cree avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(error, "Erreur lors de la creation d'un role");
    }
  }
  @Get()
  async getHello(@I18n() i18n: I18nContext) {
    return await i18n.t('test.HELLO');
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
    } catch (error) {777315892
      return ResponseBody.error(
        error,
        'Erreur lors de la recuperation des roles',
      );
    }
  }

  @Get(':code/details')
  async findOne(@Param('code') code: string): Promise<ResponseData> {
    try {
      const role = await this.roleService.findRoleByCode(code);

      if (role) {
        return ResponseBody.success({
          data: new RoleFields(role),
          message: `details role ${role.name}`,
        });
      }
      return ResponseBody.notFound(`le role ${code} n'existe pas`);
    } catch (error) {
      return ResponseBody.error(
        error,
        "Erreur lors de la recuperation d'un role",
      );
    }
  }

  @Put(':code/update')
  async update(
    @Param('code') code: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<ResponseData> {
    try {
      const roleExist = await this.roleService.findRoleByCode(code);
      if (!roleExist) {
        return ResponseBody.notFound(`le role ${code} n'existe pas`);
      }
      const { name } = updateRoleDto;

      const roleExistName = await this.roleService.findRoleByName(name);

      if (roleExistName) {
        return ResponseBody.conflict(`le role ${code} n'existe deja`);
      }
      const newRole: Role = await this.roleService.update(
        roleExist._id,
        updateRoleDto,
      );
      return ResponseBody.success({
        data: newRole,
        message: `le role ${name} a ete MAJ avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(error, 'Erreur lors de la mise a jour du role');
    }
  }

  @Delete(':code/delete')
  async remove(@Param('code') code: string): Promise<ResponseData> {
    try {
      const roleExist = await this.roleService.findRoleByCode(code);
      if (roleExist) {
        const deleteRole = await this.roleService.remove(roleExist._id);

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

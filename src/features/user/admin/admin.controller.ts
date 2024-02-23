import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';
import { ResponseBody } from 'src/utils/response-body';
import { Admin } from './entities/admin.entity';
import { ResponseData } from '../../../utils/response-body';
import { RoleService } from '../role/role.service';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '../role/entities/role.entity';
import { Model } from 'mongoose';
import { log } from 'console';

@Controller('users/admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly roleService: RoleService,

  ) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<ResponseData> {
    try {
      const email = createAdminDto.email;
      const tel = createAdminDto.tel;
      const matricule = createAdminDto.matricule;
      const userExisteEmail = await this.adminService.findAdminByEmail(email);
      const userExisteTel = await this.adminService.findAdminByTel(tel);
      const userExisteMaticule =
        await this.adminService.findAdminByMat(matricule);

      if (userExisteTel) {
        return ResponseBody.conflict(`Ce numero de telephone existe deja !`);
      }
      if (userExisteEmail) {
        return ResponseBody.conflict(`Cet email existe deja !`);
      }
      if (userExisteMaticule) {
        return ResponseBody.conflict(`Ce matricule existe deja !`);
      }

      const role = await this.roleService.findOne(createAdminDto.role);
      log(createAdminDto.role)
      if (!role) {
        return ResponseBody.notFound(`Ce role n'existe pas !`);
      }
      const body = {
        ...createAdminDto,
        role: role._id,
      };
      const newAdmin: Admin = await this.adminService.create(body);
      return ResponseBody.success({
        data: newAdmin,
        message: `l'utilisateur ${createAdminDto.name} a ete cree avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(
        error,
        "Erreur lors de la creation d'un utilisateur",
      );
    }
  }

  @Get()
  async findAll() :Promise<ResponseBody> {
try {
  const admins = await this.adminService.findAll();
  return ResponseBody.success({
    data: admins,
    message: `les utilisateurs ont ete cree avec succes`,
  });
} catch (error) {
  return ResponseBody.error(
    error,
    "Erreur de la recuperation des utilisateurs",
  );
}
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}

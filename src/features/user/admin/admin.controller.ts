import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';
import { ResponseBody } from 'src/utils/response-body';
import { Admin } from './entities/admin.entity';
import { ResponseData } from '../../../utils/response-body';
import { RoleService } from '../role/role.service';
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
      log(createAdminDto.role);
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
  async findAll(): Promise<ResponseBody> {
    try {
      const admins = await this.adminService.findAll();
      return ResponseBody.success({
        data: admins,
        message: `les utilisateurs ont ete cree avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(
        error,
        'Erreur de la recuperation des utilisateurs',
      );
    }
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseBody> {
    try {
      const admin = this.adminService.findOne(id);
      return ResponseBody.success({
        data: admin,
        message: `les utilisateurs ont ete cree avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(
        error,
        'Erreur de la recuperation de utilisateur',
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<ResponseBody> {
    try {
      const adminExist = await this.adminService.findOne(id);
      // console.log(adminExist);

      if (adminExist) {
        return ResponseBody.notFound(`Cet utilisateur n'existe pas`);
      }
      const { email } = updateAdminDto;

      const adminExistEmail = await this.adminService.findAdminByEmail(email);
      console.log(adminExistEmail);

      if (adminExistEmail) {
        return ResponseBody.conflict(`Cet email existe deja`);
      }
      const newAdmin: Admin = await this.adminService.update(
        id,
        updateAdminDto,
      );
      return ResponseBody.success({
        data: newAdmin,
        message: `l'utisateur ${email} a ete MAJ avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(
        error,
        "Erreur de la mAJ de l'utilisateur admin",
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseBody> {
    try {
      const adminExist = await this.adminService.findOne(id);
      if (adminExist) {
        const deleteAdmin = await this.adminService.remove(id);
        return ResponseBody.success({
          data: deleteAdmin,
          message: `L'utilisateur admin a ete supprime avec succes  :) `,
        });
      }
      return ResponseBody.notFound(
        `Ce utilisateur n'existe pas dans la base de donnees :( `,
      );
    } catch (error) {
      return ResponseBody.error(
        error,
        "Erreur de suppression  de l'utilisateur admin",
      );
    }
  }
}

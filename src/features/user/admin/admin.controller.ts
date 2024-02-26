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
import { AdminFields, CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';
import { ResponseBody } from 'src/utils/response-body';
import { Admin } from './entities/admin.entity';
import { ResponseData } from '../../../utils/response-body';
import { RoleService } from '../role/role.service';
import { GenerateCodeMatricule } from 'src/utils/generate/generate_matric';

@Controller('users/admins')
export class AdminController {
  constructor(
    private readonly generateCodeMatricule: GenerateCodeMatricule,
    private readonly adminService: AdminService,
    private readonly roleService: RoleService,
  ) {}

  @Post('store')
  async create(@Body() createAdminDto: CreateAdminDto): Promise<ResponseData> {
    try {
      const userExisteTel = await this.adminService.findAdminByTel(
        createAdminDto.tel,
      );
      if (userExisteTel) {
        return ResponseBody.conflict(`Ce numero de telephone existe deja !`);
      }

      const userExisteEmail = await this.adminService.findAdminByEmail(
        createAdminDto.email,
      );
      if (userExisteEmail) {
        return ResponseBody.conflict(`Cet email existe deja !`);
      }

      const role = await this.roleService.findRoleByCode(createAdminDto.role);
      if (!role) {
        return ResponseBody.notFound(`Ce role n'existe pas !`);
      }

      const matricul = this.generateCodeMatricule.generate('admin');

      const body = {
        ...createAdminDto,
        role: role._id,
        matricule: matricul,
      };
      const newAdmin: Admin = await this.adminService.create(body);

      return ResponseBody.creation({
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
  async findAll(): Promise<ResponseData> {
    try {
      const admins = await this.adminService.findAll();      
      const responseData = admins.map((value) => new AdminFields(value));

      return ResponseBody.success({
        data: responseData,
        message: `les utilisateurs ont ete cree avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(
        error,
        'Erreur de la recuperation des utilisateurs',
      );
    }
  }

  @Get(':matricule/details')
  async findOne(@Param('matricule') matricule: string): Promise<ResponseData> {
    try {
      const admin_recup = await this.adminService.findAdminByMat(matricule);
      return ResponseBody.success({
        data: admin_recup,
        message: `Details de l\'utilisateur`,
      });
    } catch (error) {
      return ResponseBody.error(
        error,
        "Erreur de la recuperation de l'utilisateur",
      );
    }
  }

  @Put(':matricule/update')
  async update(
    @Param('matricule') matricule: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<ResponseData> {
    try {
      const adminExist = await this.adminService.findAdminByMat(matricule);
      if (!adminExist) {
        return ResponseBody.notFound(`Cet utilisateur n'existe pas`);
      }

      const { email, tel, role } = updateAdminDto;
      const adminExistEmail = await this.adminService.findAdminByEmail(email);
      if (adminExistEmail) {
        if (adminExistEmail.email !== adminExist.email) {
          return ResponseBody.conflict(`Cet email existe deja`);
        }
      }

      const adminExistTel = await this.adminService.findAdminByTel(tel);
      if (adminExistTel) {
        if (adminExistTel.tel !== adminExist.tel) {
          return ResponseBody.conflict(`Cet numero de telephone existe deja`);
        }
      }

      const roleExist = await this.roleService.findRoleByCode(role);
      if (!role) {
        return ResponseBody.notFound(`Ce role n'existe pas !`);
      }
      const body = {
        ...updateAdminDto,
        role: roleExist._id
      };

      const updateAdmin: Admin = await this.adminService.update(
        adminExist._id,
        body,
      );
      return ResponseBody.success({
        data: updateAdmin,
        message: `l'utisateur ${email} a ete MAJ avec succes`,
      });
    } catch (error) {
      return ResponseBody.error(
        error,
        "Erreur de la mAJ de l'utilisateur admin",
      );
    }
  }

  @Delete(':matricule/delete')
  async remove(@Param('matricule') matricule: string): Promise<ResponseData> {
    try {
      const adminExist = await this.adminService.findAdminByMat(matricule);
      if (adminExist) {
        const deleteAdmin = await this.adminService.remove(adminExist._id);
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

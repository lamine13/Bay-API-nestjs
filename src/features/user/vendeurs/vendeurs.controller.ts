import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { VendeursService } from './vendeurs.service';
import { UpdateVendeurDto, CreateVendeurDto } from './dto/vendeur.dto';
import { GenerateCodeMatricule } from 'src/utils/generate/generate_matric';
import { RoleService } from '../role/role.service';
import * as moment from 'moment';
import { ResponseBody } from 'src/utils/response-body';

@Controller('users/vendeurs')
export class VendeursController {
  constructor(
    private readonly vendeursService: VendeursService,
    private readonly gennerateMatricule: GenerateCodeMatricule,
    private readonly roleService: RoleService,
  ) {}

  @Post('store')
  async create(
    @Body() createVendeurDto: CreateVendeurDto,
  ): Promise<ResponseBody> {
    try {
      let { gender, birthday, tel, role } = createVendeurDto;
      const matricul = this.gennerateMatricule.generate(gender, birthday, tel);
      const roleExist = await this.roleService.findRoleByCode(role);
      // birthday = moment(birthday).format('YYYY-MM-DD');
      const body = {
        ...createVendeurDto,
        role: roleExist._id,
        // birthday: moment(createVendeurDto.birthday).format('YYYY-MM-DD'),
        matricule: matricul,
      };
      console.log(body);

      const createVendeurUser = await this.vendeursService.create(body);
      console.log(createVendeurUser);

      return {
        message: "l'utilisateur a ete ajoute avec succes",
        data: createVendeurUser,
        status: HttpStatus.CREATED,
      };
    } catch (error) {}
    // return this.vendeursService.create(createVendeurDto);
  }

  @Get()
  findAll() {
    return this.vendeursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendeursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendeurDto: UpdateVendeurDto) {
    return this.vendeursService.update(+id, updateVendeurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendeursService.remove(+id);
  }
}

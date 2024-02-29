import { Injectable } from '@nestjs/common';
import { CreateVendeurDto } from './dto/create-vendeur.dto';
import { UpdateVendeurDto } from './dto/update-vendeur.dto';

@Injectable()
export class VendeursService {
  create(createVendeurDto: CreateVendeurDto) {
    return 'This action adds a new vendeur';
  }

  findAll() {
    return `This action returns all vendeurs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vendeur`;
  }

  update(id: number, updateVendeurDto: UpdateVendeurDto) {
    return `This action updates a #${id} vendeur`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendeur`;
  }
}

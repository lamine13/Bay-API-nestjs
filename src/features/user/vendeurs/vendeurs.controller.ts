import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendeursService } from './vendeurs.service';
import { CreateVendeurDto } from './dto/create-vendeur.dto';
import { UpdateVendeurDto } from './dto/update-vendeur.dto';

@Controller('vendeurs')
export class VendeursController {
  constructor(private readonly vendeursService: VendeursService) {}

  @Post()
  create(@Body() createVendeurDto: CreateVendeurDto) {
    return this.vendeursService.create(createVendeurDto);
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

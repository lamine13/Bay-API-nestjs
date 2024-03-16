import { Injectable } from '@nestjs/common';
import { UpdateVendeurDto, CreateVendeurDto } from './dto/vendeur.dto';
import { Vendeur } from './entities/vendeur.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VendeursService {
  constructor(
    @InjectModel(Vendeur.name) private vendeurModel: Model<Vendeur>,
  ) {}
  async create(createVendeurDto: CreateVendeurDto): Promise<Vendeur> {
    try {
      const vendeurCreate = new this.vendeurModel(createVendeurDto);

      return vendeurCreate.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Vendeur[]> {
    try {
      const recupeAllVendeur = this.vendeurModel.aggregate([
        {
          $lookup: {
            from: 'roles',
            localField: 'role',
            foreignField: '_id',
            as: 'role',
          },
        },
        {
          $unwind: {
            path: '$role',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      return recupeAllVendeur;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Vendeur> {
    try {
      const getUniqueVendeur = this.vendeurModel.findById(id).exec();
      return getUniqueVendeur;
    } catch (error) {}
  }

  async update(
    id: number,
    updateVendeurDto: UpdateVendeurDto,
  ): Promise<Vendeur | null> {
    try {
      const updateVendeur = this.vendeurModel.findByIdAndUpdate(
        id,
        updateVendeurDto,
      );
      return updateVendeur;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<Vendeur | null> {
    try {
      const deleteVendeur = this.vendeurModel.findByIdAndDelete(id);
      return deleteVendeur;
    } catch (error) {
      throw new Error(error);
    }
  }
}

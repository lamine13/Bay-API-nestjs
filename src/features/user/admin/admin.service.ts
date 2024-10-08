import { Injectable } from '@nestjs/common';
import { CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>,
  ) {}
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    try {
      const userCreate = new this.adminModel(createAdminDto);
      return userCreate.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Admin[]> {
    try {
      const recupeAllUser = this.adminModel.aggregate([
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
      return recupeAllUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Admin | null> {
    try {
      return this.adminModel.findById(id).exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin | null> {
    try {
      const findUserUpdate = await this.adminModel.findByIdAndUpdate(
        id,
        updateAdminDto,
        { new: true },
      );
      return findUserUpdate;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<Admin> {
    try {
      const roleDelete = this.adminModel.findByIdAndDelete(id, { new: true });
      return roleDelete;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAdminByEmail(email: string): Promise<Admin | null> {
    try {
      return this.adminModel.findOne({ email }).exec();
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAdminByTel(tel: string): Promise<Admin | null> {
    try {
      return this.adminModel.findOne({ tel }).exec();
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAdminByMat(matricule: string): Promise<Admin | null> {
    try {
      return this.adminModel.findOne({ matricule }).exec();
    } catch (error) {
      throw new Error(error);
    }
  }
}

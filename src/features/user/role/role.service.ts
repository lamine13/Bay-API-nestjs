import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/role.entity';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const newRole = new this.roleModel(createRoleDto);
      return newRole.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      return this.roleModel.find().exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Role | null> {
    try {
      return this.roleModel.findById(id).exec();
    } catch (error) {
      throw new Error(error);
    }
  }
  async findRoleByName(name: string): Promise<Role | null> {
    try {
      return this.roleModel.findOne({ name }).exec();
    } catch (error) {
      throw new Error(error);
    }
  }
  async findRoleByCode(code: string): Promise<Role | null> {
    try {
      return this.roleModel.findOne({ code }).exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    try {
      const updateRole = await this.roleModel.findByIdAndUpdate(
        id,
        updateRoleDto,
        { new: true },
      );
      return updateRole;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<Role> {
    try {
      const roleDelete = this.roleModel.findByIdAndDelete(id, { new: true });
      return roleDelete;
    } catch (error) {
      throw new Error(error);
    }
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from '../../role/entities/role.entity';
// import { AdminService } from '../admin.service';

// export type AdminDocument = HydratedDocument<Admin>;

// @Schema({ timestamps: true })
// export class Admin {

// }

// export const AdminSchema = SchemaFactory.createForClass(Admin);
@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true, unique: true })
  matricule: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: true })
  token: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  status: string;

  @Prop({ unique: true })
  identify: string;

  @Prop()
  avatar: string;

  @Prop()
  birthday: Date;

  @Prop({ required: true, unique: true })
  tel: string;

  @Prop({ required: true, unique: true })
  gender: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
  role: Role;
  _id: any;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);

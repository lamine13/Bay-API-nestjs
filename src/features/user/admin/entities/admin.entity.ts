import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '../../role/entities/role.entity';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true ,unique: true})
  matricule: string;

  @Prop({ required: true })
  password: string;

  @Prop({unique: true})
  token: string;

  @Prop({ required: true,unique: true })
  email: string;

  @Prop({ required: true })
  status: string;

  @Prop({unique: true})
  identify: string;

  @Prop()
  avatar: string;

  @Prop({ required: true ,unique: true})
  tel: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
  role: Role;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

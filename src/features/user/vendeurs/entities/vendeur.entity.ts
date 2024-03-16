import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { timeStamp } from 'console';
import { Role } from '../../role/entities/role.entity';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Vendeur {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  identity: string;

  @Prop({ required: true })
  numberIdentity: string;

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
export const VendeurShema = SchemaFactory.createForClass(Vendeur);

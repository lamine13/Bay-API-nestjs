import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({timestamps:true})
export class Role {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true, unique: true })
  code: string;
  _id: any;
  

}

export const RoleSchema = SchemaFactory.createForClass(Role);












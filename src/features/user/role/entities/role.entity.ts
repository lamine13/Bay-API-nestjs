import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  [x: string]: any;
  @Prop({ required: true, unique: true })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);












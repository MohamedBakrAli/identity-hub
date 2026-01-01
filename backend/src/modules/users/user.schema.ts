import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * User schema for MongoDB.
 * Stores user credentials and profile information.
 */
@Schema({ timestamps: true })
export class User {
  /** User's email address (unique identifier for login) */
  @Prop({ required: true, unique: true })
  email: string;

  /** User's display name */
  @Prop({ required: true })
  name: string;

  /** Hashed password */
  @Prop({ required: true })
  password: string;
}

/** Mongoose document type for User */
export type UserDocument = HydratedDocument<User>;

/** Mongoose schema generated from User class */
export const UserSchema = SchemaFactory.createForClass(User);

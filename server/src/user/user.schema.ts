import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Collection } from 'src/collections/collections.schema'
import { Token } from '../auth/token/token.schema'

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true })
    username: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ type: Types.ObjectId, ref: 'Token' })
    refreshToken: Token

    @Prop({ type: Types.ObjectId, ref: 'Collection' })
    collections: Collection[]
}

export const UserSchema = SchemaFactory.createForClass(User)

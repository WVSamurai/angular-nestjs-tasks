import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { User } from 'src/user/user.schema'

export type TokenDocument = Token & Document

@Schema()
export class Token {
    @Prop()
    token: string

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User
}

export const TokenSchema = SchemaFactory.createForClass(Token)

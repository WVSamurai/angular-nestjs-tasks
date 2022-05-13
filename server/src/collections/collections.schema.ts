import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Task } from './task.schema'
import { User } from 'src/user/user.schema'

export type CollectionDocument = Collection & Document

@Schema()
export class Collection {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    hex: string

    @Prop({ type: Map, default: {} })
    tasks: Map<string, Task>

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User
}

export const CollectionSchema = SchemaFactory.createForClass(Collection)

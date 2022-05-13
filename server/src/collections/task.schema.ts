import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TaskDocument = Task & Document

@Schema()
export class Task {
    @Prop({ required: true })
    text: string

    @Prop({ required: true, default: false })
    completed: boolean

    @Prop({ default: null, type: Date })
    completeTo: Date | null
}

export const TaskSchema = SchemaFactory.createForClass(Task)

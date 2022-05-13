import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CollectionsController } from './collections.controller'
import { CollectionsService } from './collections.service'

import { Collection, CollectionSchema } from './collections.schema'
import { Task, TaskSchema } from './task.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Collection.name, schema: CollectionSchema },
            { name: Task.name, schema: TaskSchema },
        ]),
    ],
    controllers: [CollectionsController],
    providers: [CollectionsService],
})
export class CollectionsModule {}

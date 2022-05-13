import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { CollectionDocument, Collection } from './collections.schema'
import { CreateTaskDto } from './dto/createTask.dto'
import { TaskDocument, Task } from './task.schema'

@Injectable()
export class CollectionsService {
    constructor(
        @InjectModel(Collection.name)
        private readonly collectionModel: Model<CollectionDocument>,
        @InjectModel(Task.name)
        private readonly taskModel: Model<TaskDocument>,
    ) {}

    async createCollection(name: string, hex: string, userId: string) {
        try {
            const id = new Types.ObjectId(userId)

            await this.collectionModel.create({ name, hex, user: id })

            return true
        } catch (error) {
            return false
        }
    }

    async getCollections(userId: string) {
        const id = new Types.ObjectId(userId)

        return await this.collectionModel
            .find({ user: id })
            .populate('user')
            .exec()
    }

    async deleteCollection(collId: string) {
        try {
            await this.collectionModel.deleteOne({ _id: collId })

            return true
        } catch (error) {
            return false
        }
    }

    async createTask(createTaskDto: CreateTaskDto) {
        const coll = await this.collectionModel.findById(createTaskDto.collId)

        if (!coll) return null

        const newTask = new this.taskModel({
            ...createTaskDto.request,
            completed: false,
        })

        coll.tasks.set(newTask._id, newTask)

        await coll.save()

        return newTask
    }

    async updateTask(collId: string, taskId: string) {
        const coll = await this.collectionModel.findById(collId)

        if (!coll) return null

        const task = coll.tasks.get(taskId)

        if (!task) return null

        task.completed = !task.completed

        coll.markModified('tasks')

        const saved = await coll.save()

        return saved.tasks.get(taskId)
    }

    async deleteTask(collId: string, taskId: string) {
        const coll = await this.collectionModel.findById(collId)

        if (!coll) return null

        const deleteResp = coll.tasks.delete(taskId)
        await coll.save()

        return deleteResp
    }
}

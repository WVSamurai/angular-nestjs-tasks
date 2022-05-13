import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { User, UserDocument } from './user.schema'

import { RegisterDto } from './../auth/dto/register.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async findUserByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec()
    }

    async findUserById(_id: string) {
        const id = new Types.ObjectId(_id)

        return await this.userModel.findById(id)
    }

    async createUser(userData: RegisterDto) {
        return await this.userModel.create(userData)
    }
}

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { Model, Types } from 'mongoose'

import { Token, TokenDocument } from './token.schema'

import { UserDto } from './../dto/user.dto'

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name)
        private readonly tokenModel: Model<TokenDocument>,
        private readonly jwtService: JwtService,
    ) {}

    generateTokens(user: UserDto) {
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
        }

        return {
            accessToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_ACCESS_KEY,
                expiresIn: '1d',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_KEY,
                expiresIn: '60d',
            }),
        }
    }

    async validateAccessToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_KEY,
            })
        } catch (e) {
            return null
        }
    }

    async validateRefreshToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_REFRESH_KEY,
            })
        } catch (e) {
            return null
        }
    }

    async saveToken(userId: string, token: string) {
        const user = new Types.ObjectId(userId)
        const tokenData = await this.tokenModel
            .findOne({ user })
            .populate('user')

        if (tokenData) {
            tokenData.token = token
            return await tokenData.save()
        }

        return await this.tokenModel.create({ user, token })
    }

    async removeToken(token: string) {
        return await this.tokenModel.deleteOne({ token })
    }

    async findToken(token: string) {
        return await this.tokenModel.findOne({ token }).exec()
    }
}

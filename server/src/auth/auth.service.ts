import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UserService } from './../user/user.service'
import { TokenService } from './token/token.service'

import { RegisterDto } from './dto/register.dto'

import { ShortUserInfoType } from './types/shortUserInfo.type'
import { AuthType } from './types/auth.type'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    async register(registerDto: RegisterDto): Promise<AuthType> {
        const candidate = await this.userService.findUserByEmail(
            registerDto.email,
        )

        if (candidate) {
            throw new HttpException(
                'User have already exists',
                HttpStatus.BAD_REQUEST,
            )
        }

        const hashPassword = await bcrypt.hash(registerDto.password, 5)

        const { _id, username, email } = await this.userService.createUser({
            ...registerDto,
            password: hashPassword,
        })

        const tokens = this.tokenService.generateTokens({
            _id,
            username,
            email,
        })
        await this.tokenService.saveToken(_id, tokens.refreshToken)

        return {
            user: {
                _id,
                username,
                email,
            },
            ...tokens,
        }
    }

    async login(user: ShortUserInfoType): Promise<AuthType> {
        const tokens = this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(user._id, tokens.refreshToken)

        return {
            user,
            ...tokens,
        }
    }

    async refresh(refreshToken: string): Promise<AuthType> {
        if (!refreshToken) throw new UnauthorizedException()

        const userData = await this.tokenService.validateRefreshToken(
            refreshToken,
        )
        const token = await this.tokenService.findToken(refreshToken)

        if (!userData || !token) throw new UnauthorizedException()

        const { _id, email, username } = await this.userService.findUserById(
            userData._id,
        )
        const tokens = this.tokenService.generateTokens({
            _id,
            email,
            username,
        })
        await this.tokenService.saveToken(_id, tokens.refreshToken)

        return {
            user: {
                _id,
                email,
                username,
            },
            ...tokens,
        }
    }

    async validateUser(
        email: string,
        password: string,
    ): Promise<ShortUserInfoType> {
        const user = await this.userService.findUserByEmail(email)

        if (!user) return null

        const passwordEquals = await bcrypt.compare(password, user.password)

        if (user && passwordEquals) {
            return {
                _id: user._id,
                email: user.email,
                username: user.username,
            }
        }

        return null
    }

    async logout(token: string) {
        return await this.tokenService.removeToken(token)
    }
}

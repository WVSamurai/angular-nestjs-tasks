import {
    Controller,
    Post,
    Get,
    Res,
    Body,
    UseGuards,
    Req,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { User } from './user.decorator'

import { RegisterDto } from './dto/register.dto'
import { ShortUserInfoType } from './types/shortUserInfo.type'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(
        @Res({ passthrough: true }) res: Response,
        @User() user: ShortUserInfoType,
    ) {
        const { refreshToken, ...userData } = await this.authService.login(user)

        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return userData
    }

    @Post('/register')
    async register(
        @Res({ passthrough: true }) res: Response,
        @Body() registerDto: RegisterDto,
    ) {
        const { refreshToken, ...userData } = await this.authService.register(
            registerDto,
        )

        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return userData
    }

    @Get('/refresh')
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { refreshToken } = req.cookies

        const { refreshToken: userRefreshToken, ...userData } =
            await this.authService.refresh(refreshToken)

        res.cookie('refreshToken', userRefreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        return userData
    }

    @Get('/logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { refreshToken } = req.cookies
        const token = await this.authService.logout(refreshToken)

        res.clearCookie('refreshToken')

        return token
    }
}

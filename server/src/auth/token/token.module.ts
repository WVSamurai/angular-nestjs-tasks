import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'

import { TokenSchema, Token } from './token.schema'

import { TokenService } from './token.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
        JwtModule.register({}),
    ],
    providers: [TokenService],
    exports: [TokenService, MongooseModule],
})
export class TokenModule {}

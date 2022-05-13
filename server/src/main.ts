import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { json } from 'express'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('api')
    app.enableCors({ credentials: true, origin: process.env.CLIENT_URL })

    app.use(cookieParser())
    app.use(json())

    await app.listen(process.env.PORT || 7000)
}

bootstrap()

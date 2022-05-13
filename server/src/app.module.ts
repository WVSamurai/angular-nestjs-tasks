import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module'
import { CollectionsModule } from './collections/collections.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.iizxp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        ),
        AuthModule,
        CollectionsModule,
    ],
})
export class AppModule {}

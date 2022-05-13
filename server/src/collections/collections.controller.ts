import {
    Controller,
    Get,
    UseGuards,
    Post,
    Put,
    Body,
    Delete,
    Param,
} from '@nestjs/common'

import { User } from 'src/auth/user.decorator'
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard'
import { CollectionsService } from './collections.service'

import { CreateCollectionDto } from './dto/createCollection.dto'
import { CreateTaskDto } from './dto/createTask.dto'

import { ShortUserInfoType } from 'src/auth/types/shortUserInfo.type'

@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionsController {
    constructor(private collectionsService: CollectionsService) {}

    @Get()
    async getCollections(@User() user: ShortUserInfoType) {
        return await this.collectionsService.getCollections(user._id)
    }

    @Post('/create')
    async createCollection(
        @Body() createCollectionDto: CreateCollectionDto,
        @User() user: ShortUserInfoType,
    ) {
        const { name, hex } = createCollectionDto

        return await this.collectionsService.createCollection(
            name,
            hex,
            user._id,
        )
    }

    @Delete('/:id')
    async deleteCollection(@Param('id') id: string) {
        return await this.collectionsService.deleteCollection(id)
    }

    @Post('/task/create')
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        return await this.collectionsService.createTask(createTaskDto)
    }

    @Put('/:collId/:taskId')
    async updateTask(
        @Param('collId') collId: string,
        @Param('taskId') taskId: string,
    ) {
        return await this.collectionsService.updateTask(collId, taskId)
    }

    @Delete('/:collId/:taskId')
    async deleteTask(
        @Param('collId') collId: string,
        @Param('taskId') taskId: string,
    ) {
        return await this.collectionsService.deleteTask(collId, taskId)
    }
}

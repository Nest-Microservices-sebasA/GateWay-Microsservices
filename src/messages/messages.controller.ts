import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MESSAGE_SERVICE } from 'src/config';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('messages')
export class MessagesController {
  constructor(
    @Inject(MESSAGE_SERVICE) private readonly messageClient: ClientProxy,
  ) {}

  @Post('create')
  createMessage(@Body() CreatePostDto: CreatePostDto) {
    return this.messageClient.send({ cmd: 'create_message' }, CreatePostDto);
  }

  @Get('list')
  findAllMessages() {
    return this.messageClient.send({ cmd: 'list_messages' }, {});
  }

  @Get('/findOne/:id')
  async findOneMessage(@Param('id', ParseIntPipe) id: number) {
    try {
      const message = await firstValueFrom(
        this.messageClient.send({ cmd: 'find_One_message' }, { id }),
      );

      return message;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('/delete/:id')
  deleteMessage(@Param('id') id: string) {
    return this.messageClient.send({ cmd: 'delete_message' }, { id });
  }

  @Put('/update/:id')
  updateMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.messageClient.send(
      { cmd: 'update_message' },
      {
        id,
        data: updatePostDto,
      },
    );
  }
}

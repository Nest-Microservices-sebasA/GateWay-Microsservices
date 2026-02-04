import { User as IUser } from './../auth/entities/auth.entity';
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
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { MESSAGE_SERVICE, NATS_SERVICE } from 'src/config';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('messages')
export class MessagesController {
  constructor(
    @Inject(MESSAGE_SERVICE)
    private readonly messageClient: ClientProxy,

    @Inject(NATS_SERVICE)
    private readonly authClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createMessage(@Body() createPostDto: CreatePostDto, @User() user: IUser) {
    return this.messageClient.send({ cmd: 'create_message' }, { ...createPostDto, userId: user.id })
    .pipe(
      catchError(error => {
        throw new RpcException(error);
      },
    ));
  }

  @UseGuards(AuthGuard)
  @Get('list')
  findAllMessages(@User() user: IUser) {
    return this.messageClient.send({ cmd: 'list_messages' }, {userId: user.id} ).pipe(
      catchError(error => {
        throw new RpcException(error);
      }),
    );
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

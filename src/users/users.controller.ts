import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  @Post('create')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userClient.send({ cmd: 'create_user' }, CreateUserDto);
  }

  @Get('/list')
  findAll() {
    return this.userClient.send('findAllUsers', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userClient.send('findOneUser', {});
  }
}

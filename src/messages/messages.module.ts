import { Module } from '@nestjs/common';

import { MessagesController } from './messages.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, MESSAGE_SERVICE } from 'src/config';

@Module({
  controllers: [MessagesController],
  providers: [],
  imports: [
    ClientsModule.register([
      { name: MESSAGE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.messagesMicroserviceHost,
          port: envs.messagesMicroservicePort,
        },
      },
    ]),
  
  ],
})
export class MessagesModule {}

import { Module } from '@nestjs/common';

import { MessagesController } from './messages.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, MESSAGE_SERVICE, NATS_SERVICE } from 'src/config';
import { environmentsVariables } from 'src/config/enveriments';


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
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [environmentsVariables.natsServer],
        },
      },
    ]),
  
  ],
})
export class MessagesModule {}

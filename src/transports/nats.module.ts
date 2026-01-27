import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environmentsVariables } from 'src/config/enveriments';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: environmentsVariables.natsServer,
        },
      },
    ]),
  ],
  exports:[
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: environmentsVariables.natsServer,
        },
      },
    ]),

  ]

})
export class NatsModule {}

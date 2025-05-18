import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MESSAGE_SERVICE } from 'src/config';
import { envs } from 'src/config/envs';

@Module({
  controllers: [MessageController],
  providers: [],
  imports:[
    ClientsModule.register([
      {
        name: MESSAGE_SERVICE,
        transport: Transport.RMQ,
        options:{
          urls: [envs.rabbitmqurl],
          queue: 'message-queue',
          queueOptions: {
            durable: true
          },
        }
      }
    ])
  ]
})
export class MessageModule {}

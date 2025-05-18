import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { MESSAGE_SERVICE } from 'src/config';
import { catchError } from 'rxjs';

@Controller('message')
export class MessageController {
  constructor(@Inject(MESSAGE_SERVICE) private readonly messageService: ClientProxy) { }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.send('createMessage', createMessageDto)
      .pipe(
        catchError(error => { throw new RpcException(error) }
        )
      )
  }

}

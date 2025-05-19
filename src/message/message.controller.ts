import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { MESSAGE_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('message')
export class MessageController {
  constructor(@Inject(MESSAGE_SERVICE) private readonly messageService: ClientProxy) { }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10))
  create(@UploadedFiles() files: Express.Multer.File[], @Body() createMessageDto: CreateMessageDto) {
    // if(files){
    //   const metaFiles = files.map(file => (
    //      {
    //       filename: file.filename,
    //       mimetype: file.mimetype,
    //       size: file.size,

    //     }
    //   ))
    // }
    return this.messageService.send('createMessage', {
      ...createMessageDto,
      files: files || []
    })
      .pipe(
        catchError(error => { throw new RpcException(error) }
        )
      )
  }

}

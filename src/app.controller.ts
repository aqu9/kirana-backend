import { Body, Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
	@UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  upload(@Body() body, @UploadedFile() file: Express.Multer.File){
    return this.appService.uploadFile(file);
  }
}

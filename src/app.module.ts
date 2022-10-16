import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import {UserModule} from "./user/user.module"
config();

@Module({
  imports: [UserModule,MongooseModule.forRoot(process.env.MONGODBURL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

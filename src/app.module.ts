import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import {UserModule} from "./user/user.module";
import {LoginModule} from "./Login/login.module";
import { JwtModule } from '@nestjs/jwt';
import {UserSchema,ProductSchema} from "database_Manager"
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt-startegy';
import {ProductModule} from './product/product.module';

config();

@Module({
  imports: [UserModule,ProductModule,LoginModule,MongooseModule.forRoot(process.env.MONGODBURL), MongooseModule.forRoot(process.env.MONGO_ATLAS_URL), MongooseModule.forFeature([{name:'user', schema: UserSchema}]),
  MongooseModule.forFeature([{name:'product', schema: ProductSchema}]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: process.env.ACCESS_SECRET,
    signOptions: {
      expiresIn: 3600,
    },
  })],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}

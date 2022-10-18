import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'database_Manager';
import { config } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshTokenStrategy } from '../jwt/jwt-refreshTokenStrategy';
import { JwtStrategy } from '../jwt/jwt-startegy';

config();

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  JwtModule.register({
    secret: process.env.REFRESH_SECRET,
}),],
  controllers: [LoginController],
  providers: [LoginService,JwtStrategy,JwtRefreshTokenStrategy],
})
export class LoginModule {}

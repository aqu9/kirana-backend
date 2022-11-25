import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from 'database_Manager';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDTO } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(private jwtService: JwtService,@InjectModel('user') private readonly userModel: Model<UserDocument>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login (body: LoginDTO, byPassWord: boolean = false){
    let user = await this.userModel.findOne({ "$or": [ { email: body.userId }, { phone: body.userId},{ alias: body.userId} ] })
    if(!user){
      throw new NotFoundException('User User not found')
    }
    
    if(!byPassWord && user.password !== body.password){
      throw new NotFoundException('User User not found')
  }
  const accessToken = await this.generateToken(body.userId, process.env.ACCESS_SECRET, '4h');
  const refreshToken = await this.generateToken(body.userId, process.env.REFRESH_SECRET, '1d');

      return {
          isVerified: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
          user:user
      };

      
}

async generateNewTokens(payload: any){
  
  const accessToken = await this.generateToken(payload.userId, process.env.ACCESS_SECRET, '4h');

  const refreshToken = await this.generateToken(payload.userId, process.env.REFRESH_SECRET, '1d');


  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}

async generateToken(userId: string, secret?: string, life?: string): Promise<any> {
    const payload = {
        userId: userId,
    };

    const token = await this.jwtService.sign(payload, {
        secret: secret,
        expiresIn: life,
    });
    return token;
}




}

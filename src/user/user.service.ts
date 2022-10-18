import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from 'database_Manager';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addUser (body){
    console.log(body,'---------')
    const user = new this.userModel(body)
    const checkEmail=await this.userModel.findOne({email:body.email})
    // user.save()
    return user
  }

  async getAllUser(){
    return await this.userModel.find()
  }
}

import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from 'database_Manager';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addUser (body){
    let checkEmail = await this.userModel.findOne({ "$or": [ { email: body.email }, { phone: body.phone},{ alias: body.alias} ] })
    if(checkEmail){
      throw new ForbiddenException('email or phone or alias already in use');
    }
    const user = new this.userModel(body)
    user.save()
    return user
  }

  async getAllUser(query){
    if(Object.keys(query).length===0)
    return await this.userModel.find().limit(5)

    const queryParam =[];
    if(query.email){
      queryParam.push({email:query.email})
    }

    if(query.name){
      queryParam.push({name:{"$regex":query.name,"$options":"i"}})
    }

    if(query.phone){
      queryParam.push({phone:query.phone})
    }

    const user=await this.userModel.find({"$and": queryParam})
    if(user.length===0){
      throw new NotFoundException('Data Not Found');
    }
    return user;
  }

  async getuserById(id:string){
    if(!Types.ObjectId.isValid(id)){
      throw new NotFoundException('user not found');
    }
    let checkUserById = await this.userModel.findById(id)
    if(!checkUserById){
      throw new NotFoundException('user not found');
    }
    return checkUserById
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
// import { User } from 'protegeDatabaseManager';
import {User, UserDocument } from 'database_Manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { config } from 'dotenv';
config();

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {

	//validate the signature
	constructor( @InjectModel('user') private readonly userModal:Model<UserDocument>) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
			ignoreExpiration: true,
			secretOrKey: process.env.REFRESH_SECRET,
			passReqToCallback: true,
		});
	}

	async validate(req, payload: any) {
		const { userId } = payload;
		
		let existingUser: User;

		try {
            existingUser = await this.userModal.findOne({ "$or": [ { email: userId }, { phone: userId},{alias:userId} ] })
			// existingUser = await userModal.findOne({
			// 	where: {
			// 		[Op.or]: [{ phone: userId }, { alias: userId }, { email: userId }],
			// 	},
			// });
		} catch (error) {
			throw new HttpException('Exception while connecting with the database.', HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (!existingUser) throw new HttpException('No User exists with userId : ' + userId, HttpStatus.NOT_FOUND);

		return {...existingUser,userId: userId};
	}
}

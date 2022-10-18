import { Controller, Get,Post,Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('addUser')
  async addUser(@Body() body:UserDto) {
    return await this.userService.addUser(body);
  }

  @Get('all')
  async getAllUser() {
    return await this.userService.getAllUser();
  }
}

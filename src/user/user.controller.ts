import { Controller, Get,Post,Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('addUser')
  async addUser(@Body() body) {
    return await this.userService.addUser(body);
  }
}

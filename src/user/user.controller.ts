import { Controller, Get,Post,Body,Query, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllUser(@Query() query) {
    return await this.userService.getAllUser(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getuserById(@Param('id') id) {
    return await this.userService.getuserById(id);
  }

}

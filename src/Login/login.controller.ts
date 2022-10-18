import { Controller, Get,Post,Body, UseGuards, Req } from '@nestjs/common';
import { LoginService, } from './login.service';
import { LoginDTO,LoginResponseDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  getHello(): string {
    return this.loginService.getHello();
  }

  @Post()
  async login(@Body() body : LoginDTO): Promise<LoginResponseDTO> {
    return await this.loginService.login(body)
  }

  @UseGuards(AuthGuard('jwt-refreshtoken'))
	@Post('/refreshToken')
	async refreshToken(@Req() req) {
		const result = await this.loginService.generateNewTokens(req.user);
		return result;
	}
}

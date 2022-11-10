import { Controller, Get,Post,Body, UseGuards, Req } from '@nestjs/common';
import { LoginService, } from './login.service';
import { LoginDTO,LoginResponseDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, } from '@nestjs/swagger';
@ApiTags('Login Module')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  @ApiOperation({summary: 'Dummy APi to get Hello world Response'})
  @ApiResponse({
    status: 200,
    description: 'Hello World'
})
  getHello(): string {
    return this.loginService.getHello();
  }

  @Post()
  @ApiOperation({ summary: 'Login APi'})
  @ApiBody({
      schema: {
          type: 'object',
          properties: {
            userId: {
                  type: 'string',
                  example: "himanshu01@gmail.com",
                  description: 'Enter email , phone No or alias',
              },
              password: {
                  type: 'string',
                  example: 'himanshu01',
                  description: "your'e password",
              }
          }
      }
  })
  @ApiResponse({
      status: 201,
      description: 'Logged In', schema: {
        type: 'object',
            properties: {
              isVerified: {
                    type: 'boolean',
                    example: true
                },
                accessToken: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJoaW1hbnNodTAxQGdtYWlsLmNvbSIsImlhdCI6MTY2ODA2Njg1NCwiZXhwIjoxNjY4MDgxMjU0fQ.2mwVBWAJJJbHr_T7AzzDMiFm_-1yAnqVheSH1D5lr5M'
                },
                refreshToken: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJoaW1hbnNodTAxQGdtYWlsLmNvbSIsImlhdCI6MTY2ODA2Njg1NCwiZXhwIjoxNjY4MDgxMjU0fQ.2mwVBWAJJJbHr_T7AzzDMiFm_-1yAnqVheSH1D5lr5M'
                }
            }
    }
  })
  @ApiResponse({
      status: 404,
      description: 'Not Found', schema: {
        type: 'object',
            properties: {
              statusCode: {
                    type: 'integer',
                    example: 404
                },
                message: {
                    type: 'string',
                    example: 'User User not found'
                },
                error: {
                    type: 'string',
                    example: 'Not Found'
                }
            }
    }
  })
  async login(@Body() body : LoginDTO): Promise<LoginResponseDTO> {
    return await this.loginService.login(body)
  }

  @UseGuards(AuthGuard('jwt-refreshtoken'))
	@Post('/refreshToken')
  @ApiOperation({ summary: 'Refresh Token API'})
  @ApiBody({
      schema: {
          type: 'object',
          properties: {
            refreshToken: {
                  type: 'string',
                  example: "refresh Token",
                  description: 'Enter email , phone No or alias',
              },
          }
      }
  })
  @ApiResponse({
      status: 201,
      description: 'Logged In', schema: {
        type: 'object',
            properties: {
                accessToken: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJoaW1hbnNodTAxQGdtYWlsLmNvbSIsImlhdCI6MTY2ODA2Njg1NCwiZXhwIjoxNjY4MDgxMjU0fQ.2mwVBWAJJJbHr_T7AzzDMiFm_-1yAnqVheSH1D5lr5M'
                },
                refreshToken: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJoaW1hbnNodTAxQGdtYWlsLmNvbSIsImlhdCI6MTY2ODA2Njg1NCwiZXhwIjoxNjY4MDgxMjU0fQ.2mwVBWAJJJbHr_T7AzzDMiFm_-1yAnqVheSH1D5lr5M'
                }
            }
    }
  })
  @ApiResponse({
      status: 401,
      description: 'Not Found', schema: {
        type: 'object',
            properties: {
              statusCode: {
                    type: 'integer',
                    example: 401
                },
                message: {
                    type: 'string',
                    example: 'Unauthorized'
                }
            }
    }
  })
	async refreshToken(@Req() req) {
		const result = await this.loginService.generateNewTokens(req.user);
		return result;
	}
}

import { Controller, Get,Post,Body,Query, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { IsMongoIdDto } from '../product/dto';

@ApiTags('User Module')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({summary: 'Dummy APi to get Hello world Response'})
  @ApiResponse({
    status: 200,
    description: 'Hello World'
})
  getHello(): string {
    return this.userService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addUser')
  @ApiOperation({ summary: 'Create user api'})
  @ApiBearerAuth()
  @ApiBody({
      schema: {
          type: 'object',
          properties: {
            name: {
                  type: 'string',
                  example: "Enter your name",
              },
              email: {
                  type: 'string',
                  example: 'Enter you Email',
              },
              phone: {
                  type: 'string',
                  example: 'Enter your phone number',
              },
              dob: {
                  type: 'string',
                  example: 'Enter your Date of Birth',
              },
              address: {
                  type: 'string',
                  example: 'Enter your address',
              },

              password: {
                  type: 'string',
                  example: 'Enter your password',
              },
              alias: {
                  type: 'string',
                  example: 'Enter your alias',
              }
          }
      }
  })
  @ApiResponse({
      status: 201,
      description: 'Logged In', schema: {
        type: 'object',
            properties: {
              name: {
                    type: 'string',
                    example: "your name",
                },
                email: {
                    type: 'string',
                    example: 'you Email',
                },
                phone: {
                    type: 'string',
                    example: 'your phone number',
                },
                dob: {
                    type: 'string',
                    example: 'your Date of Birth',
                },
                address: {
                    type: 'string',
                    example: 'your address',
                },
                alias: {
                    type: 'string',
                    example: 'your alias',
                },
                _id: {
                  type: 'string',
                  example: 'unique ID',
              }
            }
    }
  })
  @ApiResponse({
      status: 403,
      description: 'Forbidden ', schema: {
        type: 'object',
            properties: {
              statusCode: {
                    type: 'integer',
                    example: 403
                },
                message: {
                    type: 'string',
                    example: 'email or phone or alias already in use'
                },
                error: {
                    type: 'string',
                    example: 'Forbidden'
                }
            }
    }
  })
  async addUser(@Body() body:UserDto) {
    return await this.userService.addUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  @ApiOperation({ summary: 'get all users'})
  @ApiBearerAuth()
  @ApiQuery({name:"name", type:"string", required:false})
  @ApiResponse({
    status: 200,
    description: 'filter user', schema: {
      type: 'array',
      items:{
          type:'object',
          properties: {
            name: {
                  type: 'string',
                  example: "your name",
              },
              email: {
                  type: 'string',
                  example: 'you Email',
              },
              phone: {
                  type: 'string',
                  example: 'your phone number',
              },
              dob: {
                  type: 'string',
                  example: 'your Date of Birth',
              },
              address: {
                  type: 'string',
                  example: 'your address',
              },
              alias: {
                  type: 'string',
                  example: 'your alias',
              },
              _id: {
                type: 'string',
                example: 'unique ID',
            }
          }
        }
  }
})
  async getAllUser(@Query() query) {
    return await this.userService.getAllUser(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'get user by id'})
  @ApiBearerAuth()
  @ApiParam({name:"id", type:"string"})
  @ApiResponse({
    status: 201,
    description: 'search by id', schema: {
      type: 'object',
          properties: {
            name: {
                  type: 'string',
                  example: "your name",
              },
              email: {
                  type: 'string',
                  example: 'you Email',
              },
              phone: {
                  type: 'string',
                  example: 'your phone number',
              },
              dob: {
                  type: 'string',
                  example: 'your Date of Birth',
              },
              address: {
                  type: 'string',
                  example: 'your address',
              },
              alias: {
                  type: 'string',
                  example: 'your alias',
              },
              _id: {
                type: 'string',
                example: 'unique ID',
            }
          }
  }
})
  async getuserById(@Param() id: IsMongoIdDto) {
    return await this.userService.getuserById(id.id);
  }

}

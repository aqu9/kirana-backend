import { Controller, Get,Post,Body,Query, UseGuards, Param ,Put} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto,CategoryDto,CategoryUpdateDto, IsMongoIdDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { categories, categoriesForFE } from 'database_Manager';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags,ApiBearerAuth,ApiQuery } from '@nestjs/swagger';
import { categories as categoriesTypes,typeOfQuantity } from 'database_Manager/category.config';


@ApiTags('Product Module')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getHello(): string {
    return this.productService.getHello();
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post('addproduct')
  @ApiOperation({ summary: 'create product api' })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'coke',
        },
        rating: {
          type: 'number',
          example: '5',
        },
        price: {
          type: 'number',
          example: '100',
        },
        stock: {
          type: 'number',
          example: '2',
        },
        logo_link: {
          type: 'string',
          example: 'Enter your link',
        },
        type_of_quantity: {
          type: 'string',
          example: 'Packets',
          enum: typeOfQuantity,
        },
        is_packed_item: {
          type: 'boolean',
          example: true,
        },
        description: {
          type: 'string',
          example: 'product description',
        },
        additional_field: {
          type: 'string',
          example: 'some',
        },
        is_visible: {
          type: 'boolean',
          example: true,
        },
        is_veg: {
          type: 'boolean',
          example: true,
        },
        category: {
          type: 'string',
          example: 'others',
          enum: categoriesTypes,
        },
        keywords: {
          type: 'string[]',
          example: ['a', 'b'],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'created Product',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'coke',
        },
        rating: {
          type: 'number',
          example: '5',
        },
        price: {
          type: 'number',
          example: '100',
        },
        stock: {
          type: 'number',
          example: '2',
        },
        logo_link: {
          type: 'string',
          example: 'Enter your link',
        },
        type_of_quantity: {
          type: 'string',
          example: 'Packets',
          enum: typeOfQuantity,
        },
        is_packed_item: {
          type: 'boolean',
          example: true,
        },
        description: {
          type: 'string',
          example: 'product description',
        },
        additional_field: {
          type: 'string',
          example: 'some',
        },
        is_visible: {
          type: 'boolean',
          example: true,
        },
        is_veg: {
          type: 'boolean',
          example: true,
        },
        category: {
          type: 'string',
          example: 'others',
          enum: categoriesTypes,
        },
        keywords: {
          type: 'string[]',
          example: ['a', 'b'],
        },
      },
    },
  })
  async addProduct(@Body() body: ProductDto) {
    return await this.productService.addProduct(body);
  }

  @Get('all')
  @ApiOperation({ summary: 'get all product' })
  @ApiQuery({ name: 'name', type: 'string', required: false })
  @ApiQuery({ name: 'category', type: 'string', required: false })
  @ApiResponse({
    status: 200,
    description: 'filter product',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'coke',
          },
          rating: {
            type: 'number',
            example: '5',
          },
          price: {
            type: 'number',
            example: '100',
          },
          stock: {
            type: 'number',
            example: '2',
          },
          logo_link: {
            type: 'string',
            example: 'Enter your link',
          },
          type_of_quantity: {
            type: 'string',
            example: 'Packets',
            enum: typeOfQuantity,
          },
          is_packed_item: {
            type: 'boolean',
            example: true,
          },
          description: {
            type: 'string',
            example: 'product description',
          },
          additional_field: {
            type: 'string',
            example: 'some',
          },
          is_visible: {
            type: 'boolean',
            example: true,
          },
          is_veg: {
            type: 'boolean',
            example: true,
          },
          category: {
            type: 'string',
            example: 'others',
            enum: categoriesTypes,
          },
          keywords: {
            type: 'string[]',
            example: ['a', 'b'],
          },
        },
      },
    },
  })
  async getAllProduct(@Query() query) {
    return await this.productService.getAllProduct(query);
  }

 
  @UseGuards(AuthGuard('jwt'))
  @Get('category')
  async getProductCategory() {
    return this.productService.getAllParentCategory();
  }

  @Get('category/all')
  async getProductCategories() {
    return this.productService.getAllCategories();
  }

  @Post('category')
  async AddCategory(@Body() body:CategoryDto) {
    console.log()
    return this.productService.addCategories(body);
  }

  @Put('category/:id')
  async UpdateCategory(@Body() body:CategoryUpdateDto, @Param() id:IsMongoIdDto) {
    console.log()
    return this.productService.updateCategory(body, id.id);
  }

  @Get('category/:id')
  async getSubCategoryByCategoryId(@Param() id:IsMongoIdDto) {
    return this.productService.getSubCategoryByCategoryId(id.id,1);
  }

  @Get('/:id')
  async getProductByCategory(@Param() id :IsMongoIdDto) {
    return this.productService.getProductByCategoryId(id.id);
  }
}


                            
import { Controller, Get,Post,Body,Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { categories } from 'database_Manager';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, } from '@nestjs/swagger';


@ApiTags('Product Module')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getHello(): string {
    return this.productService.getHello();
  }

  @Post('addproduct')
  async addProduct(@Body() body:ProductDto) {
    return await this.productService.addProduct(body);
  }

//   @UseGuards(AuthGuard('jwt'))
   @Get('all')
   async getAlProduct(@Query() query) {
     return await this.productService.getAllProduct(query);
   }

   @Get('category')
   async getProductCategory() {
     return categories;
   }

}

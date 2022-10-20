import { Controller, Get,Post,Body,Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

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

}

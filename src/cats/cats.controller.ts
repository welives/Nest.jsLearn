import { Controller, Get, Post, Query } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  getCats() {
    return this.catsService.getCats();
  }
  @Get('id')
  getCatById(@Query() query) {
    return {
      code: 0,
      data: { id: query.id },
      message: '',
    };
  }
  @Post()
  createCat() {
    return this.catsService.createCat();
  }
}

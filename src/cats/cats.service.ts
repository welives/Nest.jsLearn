import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getCats() {
    return {
      code: 0,
      data: ['阿橘', '狸花'],
      message: '',
    };
  }
  createCat() {
    return {
      code: 0,
      data: { id: 1, name: '米粒', age: 4 },
      message: '',
    };
  }
}

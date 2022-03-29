import { Controller, Get } from '@nestjs/common';

function generateRandomData() {
  return Array.from({ length: 4 }).map((_, index: number) => {
    return {
      x: new Date().getTime() - 250 * (index + 1),
      y: Math.round(1 + Math.random() * 500),
    };
  });
}

@Controller('/')
export class AppController {
  @Get('/data')
  getRandomData() {
    return [generateRandomData(), generateRandomData()];
  }
}

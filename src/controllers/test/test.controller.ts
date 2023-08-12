import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get('/')
  index() {
    return {
      name: 'hi',
      timestamp: new Date(),
    };
  }
}

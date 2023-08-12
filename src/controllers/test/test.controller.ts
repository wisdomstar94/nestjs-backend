import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('test')
export class TestController {
  constructor(private configService: ConfigService) {}

  @Get('/')
  index() {
    return {
      name: 'hi',
      timestamp: new Date(),
      testVariable: this.configService.get<string>('TEST_VARIABLE'),
    };
  }
}

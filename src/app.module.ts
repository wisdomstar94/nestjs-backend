import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './controllers/test/test.module';

@Module({
  imports: [
    TestModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

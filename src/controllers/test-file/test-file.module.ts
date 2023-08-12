import { Module } from '@nestjs/common';
import { TestFileController } from './test-file.controller';

@Module({
  controllers: [TestFileController],
  imports: [],
})
export class TestFileModule {}

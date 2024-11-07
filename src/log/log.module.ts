import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { LogService } from './log.service';
import { LogController } from './log.controller';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  providers: [LogService],
  controllers: [LogController],
  exports: [LogService],
})
export class LogModule {}

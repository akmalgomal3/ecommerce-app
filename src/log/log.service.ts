import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async saveLog(index: string, message: string, userId: number) {
    try {
      const log = {
        message,
        timestamp: new Date(),
        userId,
      };
      await this.elasticsearchService.index({
        index,
        body: log,
      });
      this.logger.log(`Log saved: ${message}`);
    } catch (error) {
      this.logger.error('Error saving log to Elasticsearch', error);
    }
  }

  async getLogs(index: string) {
    const { hits } = await this.elasticsearchService.search({
      index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
    return hits.hits.map((hit) => hit._source);
  }

  async searchLogs(index: string, query: string) {
    const { hits } = await this.elasticsearchService.search({
      index,
      body: {
        query: {
          match: { message: query },
        },
      },
    });
    return hits.hits.map((hit) => hit._source);
  }
}

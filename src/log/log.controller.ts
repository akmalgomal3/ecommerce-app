import { Controller, Get, Query } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async getAllLogs() {
    return this.logService.getLogs('user-activity-logs');
  }

  @Get('search')
  async searchLogs(@Query('q') query: string) {
    return this.logService.searchLogs('user-activity-logs', query);
  }
}

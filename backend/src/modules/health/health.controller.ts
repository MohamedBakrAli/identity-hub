import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Health check controller for container orchestration and monitoring.
 */
@ApiTags('Health')
@Controller('health')
export class HealthController {
  /**
   * Basic health check endpoint.
   * Returns 200 if the service is running.
   */
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}


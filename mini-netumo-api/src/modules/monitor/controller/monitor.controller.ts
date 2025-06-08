import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { MonitorResponseDto } from '../dto/monotor-response.dto';
import { CreateTargetDto } from '../dto/create-target.dto';
import { TargetService } from '../service/target.service';

@ApiTags('monitor')
@Controller('monitor')
export class MonitorController {
  constructor(private readonly targetService: TargetService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a monitoring target',
    description: 'Creates a monitored target URL for the authenticated user',
  })
  @ApiResponse({
    status: 201,
    description: 'Target created successfully',
    type: MonitorResponseDto,
  })
  async create(
    @Body() createTargetDto: CreateTargetDto,
    @Req() req: Request & { user: any },
  ): Promise<MonitorResponseDto> {
    const savedTarget = await this.targetService.create(
      createTargetDto,
      req.user.sub as string,
    );

    return {
      timestamp: new Date(),
      status: 200,
      success: true,
      message: 'Target saved successfully',
      data: savedTarget,
      path: req.url,
    };
  }
}

import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  HttpCode,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { ResponseDTO } from 'src/shared/dto/response.dto';
import { MonitorResponseDto } from '../dto/monotor-response.dto';
import { CreateTargetDto } from '../dto/create-target.dto';
import { TargetDto, TargetResponseDto } from '../dto/target.dto';
import { TargetService } from '../service/target.service';

@ApiTags('targets')
@Controller('targets')
export class TargetController {
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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get all targets for the current user',
    description:
      'Returns all monitoring targets owned by the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User targets fetched successfully',
    type: TargetResponseDto,
  })
  async findMyTargets(
    @Req() req: Request & { user: any },
  ): Promise<ResponseDTO<TargetDto[]>> {
    const ownerId = req.user.sub as string;
    const targets = await this.targetService.findByOwner(ownerId);

    return {
      timestamp: new Date(),
      status: 200,
      success: true,
      message: 'Targets fetched successfully',
      data: targets,
      path: req.url,
    };
  }

  @Get(':targetId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get targetfor the current user',
    description: 'Returns monitoring target owned by the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User target fetched successfully',
    type: TargetResponseDto,
  })
  async findMyTarget(
    @Param('targetId') targetId: string,
    @Req() req: Request & { user: any },
  ): Promise<ResponseDTO<TargetDto>> {
    const ownerId = req.user.sub as string;
    const target = await this.targetService.findTarget(ownerId, targetId);

    return {
      timestamp: new Date(),
      status: 200,
      success: true,
      message: 'Target fetched successfully',
      data: target,
      path: req.url,
    };
  }
}

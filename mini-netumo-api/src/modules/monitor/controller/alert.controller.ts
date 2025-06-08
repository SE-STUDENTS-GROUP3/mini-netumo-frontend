import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlertService } from '../service/alert.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { Request } from 'express';
import { AlertDto, AlertResponseDto } from '../dto/alert.dto';
import { ResponseDTO } from 'src/shared/dto/response.dto';

@ApiTags('alerts')
@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Get(':targetId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Retrieve target Alerts',
    description: 'Allows authenticated user to retieve alerts for the target',
  })
  @ApiResponse({
    status: 200,
    description: 'Alerts retrieved successfully',
    type: AlertResponseDto,
  })
  async alerts(
    @Param('targetId') targetId: string,
    @Req() req: Request & { user: any },
  ): Promise<ResponseDTO<AlertDto[]>> {
    const alerts = await this.alertService.getAlerts(
      req.user.sub as string,
      targetId,
    );

    return {
      timestamp: new Date(),
      status: 200,
      success: true,
      message: 'Alerts retrieved successfully',
      data: alerts,
      path: req.url,
    };
  }
}

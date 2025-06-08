import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthPayloadDto } from '../dto/auth-payload.dto';
import { AuthTokenResponse } from '../dto/auth-token-response.dto';
import { ResponseDTO } from 'src/shared/dto/response.dto';
import { Request } from 'express';
import { User } from 'src/modules/users/entities/user.entity';
import { LocalGuard } from '../guard/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: 'Authenticate User',
    description: 'Allow users to authenticate their identity',
  })
  @ApiResponse({
    status: 201,
    description: 'User authenticated successfully',
    type: AuthTokenResponse,
  })
  @HttpCode(200)
  @UseGuards(LocalGuard)
  async login(
    @Body() authPayload: AuthPayloadDto,
    @Req() req: Request,
  ): Promise<ResponseDTO<AuthTokenResponse>> {
    const access = await this.authService.login(req.user as User);

    return {
      timestamp: new Date(),
      status: 200,
      success: true,
      message: 'User authenticated successfully',
      data: access,
      path: req.url,
    };
  }
}

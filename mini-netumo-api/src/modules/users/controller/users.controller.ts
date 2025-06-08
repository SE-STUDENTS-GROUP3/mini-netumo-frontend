import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../service/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from 'src/shared/dto/response.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Allow users to create a new account',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: ResponseDTO,
  })
  @HttpCode(201)
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req,
  ): Promise<ResponseDTO<null>> {
    await this.usersService.create(createUserDto);
    return {
      timestamp: new Date(),
      status: 201,
      success: true,
      message: 'User created successfully',
      data: null,
      path: req.url,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}

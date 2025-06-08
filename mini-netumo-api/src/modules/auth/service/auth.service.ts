import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth-payload.dto';
import { UsersService } from 'src/modules/users/service/users.service';
import { Hash } from 'src/shared/helpers/hash.helper';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenResponse } from '../dto/auth-token-response.dto';
import { configService } from 'src/config/config.service';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(authPayload: AuthPayloadDto): Promise<User | null> {
    const user = await this.usersService.findByEmail(authPayload.username);

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await Hash.compare(
      authPayload.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return null;
    }

    delete (user as any).password;
    return user;
  }

  async login(user: User): Promise<AuthTokenResponse> {
    const tokenConfig = configService.getTokenConfig();

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        user,
      },
      {
        secret: tokenConfig.secret,
        expiresIn: `${tokenConfig.tokenLife}s`,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        secret: tokenConfig.refreshTokenSecret,
        expiresIn: `${tokenConfig.refreshTokenLife}s`,
      },
    );

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }
}

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const { username, password } = loginData;
    this.logger.log(`Logging in user with username: ${username}`);

    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      this.logger.warn(`User not found: ${username}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      this.logger.warn(`Invalid password for username: ${username}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    if(!user.isActive) {
      this.logger.warn(`User is not active: ${username}`);
      throw new UnauthorizedException('User is not active');
    }

    const payload: JwtPayload = { username: user.username, uid: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

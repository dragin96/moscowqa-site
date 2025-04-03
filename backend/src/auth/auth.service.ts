import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private users: any[];

  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.users = [
      {
        id: 1,
        username: this.configService.get('ADMIN_USER'),
        password: this.configService.get('ADMIN_PASSWORD'),
      },
    ];
  }

  validateUser(username: string, password: string): any {
    const user = this.users.find(
      (user) => user.username === username && user.password === password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async validateUserById(userId: number): Promise<any> {
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  login(user: LoginAuthDto) {
    const validatedUser = this.validateUser(user.username, user.password);
    const payload = { username: validatedUser.username, sub: validatedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

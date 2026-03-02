import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  private saltRound: number = 12;

  constructor(private readonly userService: UsersService) {}

  async register(createAuthDto: CreateAuthDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: Omit<User['password'], string>;
  }> {
    const salt = await bcrypt.genSalt(this.saltRound);
    const hashedPassword = await bcrypt.hash(createAuthDto.password, salt);
    const user = await this.userService.create({
      name: createAuthDto.name,
      email: createAuthDto.email,
      password: hashedPassword,
      auth_provider: 'credentials',
    });
    return {
      access_token: '',
      refresh_token: '',
      user,
    };
  }

  async credentialsLogin(data: LoginUserDto) {
    const user = await this.userService.findByEmail(data.email);
  }

  // generate JWT token
  async generateTokens(data: TokenDto): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    return {
      access_token: '',
      refresh_token: '',
    };
  }
}

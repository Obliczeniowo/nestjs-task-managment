import { User } from './user.entity';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-credentiols.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(private repository: UsersRepository, private jwtService: JwtService) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.repository.add(authCredentialsDto);
  }

  async get(id: string): Promise<User> {
    const found = await this.repository.findOneBy({ id });

    if (found) {
      return found;
    }

    throw new NotFoundException();
  }

  async signIn(credentials: LoginCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = credentials;

    const user = await this.repository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Próba nieautoryzowanego dostępu')
    }
  }

  async getAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }
}

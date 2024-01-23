import { User } from './user.entity';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-credentiols.dto';
@Injectable()
export class AuthService {
  constructor(private repository: UsersRepository) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.repository.add(authCredentialsDto);
  }

  async get(id: string): Promise<User> {
    const found = await this.repository.findOneBy({ id });

    if (found ) {
      return found;
    }

    throw new NotFoundException();
  }

  async signIn(credentials: LoginCredentialsDto): Promise<string> {
    const { username, password } = credentials;

    const user = await this.repository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Próba nieautoryzowanego dostępu')
    }
  }

  async getAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }
}

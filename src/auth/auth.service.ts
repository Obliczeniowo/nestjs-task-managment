import { User } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private repository: AuthRepository) {
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

  async getAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }
}

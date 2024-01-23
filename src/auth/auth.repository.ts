import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async add(credentials: AuthCredentialsDto): Promise<void> {
    const user = this.create(credentials);
    await this.save(user);
  }
}
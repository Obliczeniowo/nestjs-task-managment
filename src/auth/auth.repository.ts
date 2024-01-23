import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
      await this.save(user);
    } catch (error) {
      let exception;
      switch (error.code) {
        case 23505: {
          exception =  new ConflictException('Nazwa użytkownika istnieje')
        }
        default: {
          exception = new InternalServerErrorException();
        }
      }
      throw exception;
    }
  }
}
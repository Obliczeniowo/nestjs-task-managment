import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async add(credentials: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(credentials.password, salt);

    const user = this.create({
      ...credentials,
      password: passwordHashed
    });

    try {
      await this.save(user);
    } catch (error) {
      let exception;
      switch (error.code) {
        case '23505': {
          exception = new ConflictException('Nazwa użytkownika istnieje')
        }
          break;
        default: {
          exception = new InternalServerErrorException();
        }
      }
      throw exception;
    }
  }
}
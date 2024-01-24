import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { User } from 'src/auth/user.entity';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class TasksService {
  constructor(private repository: TasksRepository) {
  }

  getAll(filters: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.repository.getAll(filters, user);
  }

  async get(id: string, user: User): Promise<Task> {
    // await this.repository.findOne({ where: { id: id } }); // alternative
    const found = await this.repository.findOne({ where: { id, user } });

    if (found) {
      return found;
    }

    throw new NotFoundException();
  }

  create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.repository.add(createTaskDto, user);
  }

  async updateStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const found = await this.get(id, user);

    found.status = status;

    await this.repository.update(id, found);

    return found;
  }

  async delete(id: string, user: User) {
    const result = await this.repository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}

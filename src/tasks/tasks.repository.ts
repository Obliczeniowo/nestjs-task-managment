import { DataSource, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { json } from 'stream/consumers';

@Injectable()
export class TasksRepository extends Repository<Task> {
  logger: Logger = new Logger('TasksRepository');

  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async add(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
      user
    });
    await this.save(task);
    return task;
  }

  async getAll(filters: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filters;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search: `%${search.toLowerCase()}%` }
      );
    }

    try {
      const tasks: Task[] = await query.getMany();
      return tasks; 
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`, error.stack)
    }

  }
}
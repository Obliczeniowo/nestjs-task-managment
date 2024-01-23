import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.enum';
import { v4 as uuid } from 'uuid';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from 'src/data-source';
import { TasksRepository } from './tasks.repository';


@Injectable()
export class TasksService {
  constructor(private repository: TasksRepository) { }

  // getAll(): Task[] {
  //   return this.tasks;
  // }

  // getFiltered(filters: GetTaskFilterDto): Task[] {
  //   const { status, search } = filters;

  //   let tasks = this.getAll();

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //     console.log(tasks);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(task => ['description', 'title'].find(key => task[key].toLowerCase().includes(search)));
  //   }

  //   return tasks;
  // }

  async get(id: string): Promise<Task> {
    // await this.repository.findOne({ where: { id: id } }); // alternative
    const found = await this.repository.findOneBy({ id });

    if (found) {
      return found;
    }

    throw new NotFoundException();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.repository.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
    });
    await this.repository.save(task);
    return task;
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const found = await this.get(id);

    found.status = status;

    await this.repository.update(id, found);

    return found;
  }

  async delete(id: string) {
    await this.get(id);
    return await this.repository.delete(id);
  }
}

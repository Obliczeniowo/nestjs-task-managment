import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.enum';
import { v4 as uuid } from 'uuid';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from 'src/data-source';
import { TasksRepository } from './tasks.repository';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';


@Injectable()
export class TasksService {
  constructor(private repository: TasksRepository) { }

  async getAll(): Promise<Task[]> {
    return await this.repository.find();
  }

  // async getFiltered(filters: GetTaskFilterDto): Promise<Task[]> {
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

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.repository.add(createTaskDto);
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const found = await this.get(id);

    found.status = status;

    await this.repository.update(id, found);

    return found;
  }

  async delete(id: string) {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}

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
  constructor(private taskEntityRepository: TasksRepository) {}

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
    const found = await this.taskEntityRepository.findOneBy({ id });

    if (found) {
      return found;
    }

    throw new NotFoundException();
  }

  // create(createTaskDto: CreateTaskDto): Task {
  //   const task = {
  //     ...createTaskDto,
  //     id: uuid(),
  //     status: TaskStatus.OPEN
  //   }

  //   this.tasks.push(task);

  //   return task;
  // }

  // updateStatus(id: string, status: TaskStatus): Task {
  //   const found = this.get(id);

  //   found.status = status;
  //   return found;
  // }

  // delete(id: string) {
  //   this.get(id);
  //   this.tasks = this.tasks.filter(task => task.id !== id);
  // }
}

import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, Param } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  get(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  create(createTaskDto: CreateTaskDto): Task {
    const task = {
      ...createTaskDto,
      id: uuid(),
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);

    return task;
  }

  delete(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}

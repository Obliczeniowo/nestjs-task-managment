import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  getFiltered(filters: GetTaskFilterDto): Task[] {
    const { status, search } = filters;

    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
      console.log(tasks);
    }

    if (search) {
      tasks = tasks.filter(task => ['description', 'title'].find(key => task[key].toLowerCase().includes(search)));
    }

    return tasks;
  }

  get(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      return task;
    }
    throw new NotFoundException(`Zadanie z id: ${id} nie zostało odnalezione`);
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

  updateStatus(id: string, status: TaskStatus): Task {
    const found = this.get(id);

    found.status = status;
    return found;
  }

  delete(id: string) {
    this.get(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}

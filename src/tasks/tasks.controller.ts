import { Controller, Get, Options } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Options()
  options() {
    return;
  }

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
}

import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Get, Options, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Options()
  options() {
    return;
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAll();
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    return this.tasksService.get(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto
  ): Task {
    return this.tasksService.create(createTaskDto);
  }

}

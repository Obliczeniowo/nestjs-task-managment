import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Delete, Get, Options, Param, Post, Put } from '@nestjs/common';
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
  getAll(): Task[] {
    return this.tasksService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id: string): Task {
    return this.tasksService.get(id);
  }

  @Post()
  create(
    @Body() dto: CreateTaskDto
  ): Task {
    return this.tasksService.create(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id);
  }

}

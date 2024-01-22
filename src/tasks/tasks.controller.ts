import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Delete, Get, Options, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Options()
  options() {
    return;
  }

  @Get()
  getAll(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getFiltered(filterDto);
    }

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

  @Patch('/:id/status')
  updateStatus(
    @Param() id: string,
    @Body() update: UpdateTaskStatusDto
  ): Task {
    return this.tasksService.updateStatus(id, update.status);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id);
  }

}

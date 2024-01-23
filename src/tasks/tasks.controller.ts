import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Delete, Get, Options, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Options()
  options() {
    return;
  }

  // @Get()
  // getAll(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getFiltered(filterDto);
  //   }

  //   return this.tasksService.getAll();
  // }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<Task> {
    return this.tasksService.get(id);
  }

  @Post()
  async create(
    @Body() dto: CreateTaskDto
  ): Promise<Task> {
    return await this.tasksService.create(dto);
  }

  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() update: UpdateTaskStatusDto
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, update.status);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.tasksService.delete(id);
  }

}

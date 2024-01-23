import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Delete, Get, Options, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Options()
  options() {
    return;
  }

  @Get()
  getAll(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    return this.tasksService.getAll(filterDto, user)
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<Task> {
    return this.tasksService.get(id);
  }

  @Post()
  async create(
    @Body() dto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return await this.tasksService.create(dto, user);
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

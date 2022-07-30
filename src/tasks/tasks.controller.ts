import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

// Controller job is to receive the request, delegate it and send back the response
@Controller('tasks') // the endpoint is '/tasks'
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get decorator exposes the method on the API as a GET request
  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body('title') title, @Body('description') description): Task {
    console.log('title', title);
    console.log('description', description);
    return this.taskService.createTask(title, description);
  }
}

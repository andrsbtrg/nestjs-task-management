import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
  // Temporarily this is a local array
  private tasks: Task[] = [];

  // By default its public
  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): void {
    // const taskDelete = this.tasks.find((task) => task.id === id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateStatus(id: string, newStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
    // const task = this.tasks.find((task) => task.id === id);
    task.status = newStatus;
    // this.tasks = this.tasks.filter((task) => task.id !== id);
    // this.tasks.push(task);
    return task;
  }

  getTasksWithFilter(filterDro: GetTasksFilterDto): Task[] {
    const { status, search } = filterDro;

    // define a temporary array to hold the result
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}

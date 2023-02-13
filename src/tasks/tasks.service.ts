import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task{

        const { title, description } = createTaskDto;
        
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): string {
        this.tasks = this.tasks.filter(task => task.id !== id);  
        return 'Task deleted Succesfully';
    }

    updateTask(id: string, status: TaskStatus): Task {
        let indexUpdated = -1;
        this.tasks.forEach((task, index)=>{
            if(task.id === id){
                this.tasks[index].status = status;
                indexUpdated = index;
            }
        });  
        if(indexUpdated != -1){
            return this.tasks[indexUpdated];
        }
    }
}

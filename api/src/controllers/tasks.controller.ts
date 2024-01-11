import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Tasks } from "../entity/Tasks";

export class TasksController {
  static async getAllTasks(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const taskRepository = AppDataSource.getRepository(Tasks);
      const tasks = await taskRepository.find();
      cache.put("data", tasks, 10000);
      return res.status(200).json({
        data: tasks,
      });
    }
  }
  static async createTask(req: Request, res: Response) {
    const { title, description, status, user_id } =
      req.body;
    const tasks = new Tasks();
    tasks.user_id = user_id;
    tasks.title = title;
    tasks.description = description;    
    tasks.status = status;
    const taskRepository = AppDataSource.getRepository(Tasks);
    const task = await taskRepository.findOne({
      where: { description }
    });
    await taskRepository.save(tasks);
    return res
      .status(200)
      .json({ message: "Task created successfully", tasks });
  }

  static async updateTask(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, status, user_id } =
      req.body;
    const taskRepository = AppDataSource.getRepository(Tasks);
    const task = await taskRepository.findOne({
      where: { id },
    });
    task.user_id = user_id;
    task.title = title;
    task.description = description;    
    task.status = status;
    await taskRepository.save(task);
    return res
      .status(200)
      .json({ message: "Task updated successfully", task });
  }

  static async deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    const taskRepository = AppDataSource.getRepository(Tasks);
    const task = await taskRepository.findOne({
      where: { id },
    });
    await taskRepository.remove(task);
    return res
      .status(200)
      .json({ message: "Task deleted successfully", task });
  }
}
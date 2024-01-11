import * as express from "express";
import { authentification } from "../middleware/authentification";
import { TasksController } from "../controllers/tasks.controller";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/tasks", authentification, TasksController.getAllTasks);
Router.post("/tasks", authentification, TasksController.createTask);

Router.put(
  "/tasks/:id",
  authentification,
  authorization(["admin"]),
  TasksController.updateTask
);
Router.delete(
  "/tasks/:id",
  authentification,
  authorization(["admin"]),
  TasksController.deleteTask
);
export { Router as tasksRouter };
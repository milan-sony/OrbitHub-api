import express from "express";
import { createTasks, getTasks } from "../../controllers/taskControllers.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const taskRoutes = express.Router();

// Create tasks
taskRoutes.post("/setTasks", verifyToken, createTasks);
taskRoutes.get("/getTasks", getTasks);

export default taskRoutes;
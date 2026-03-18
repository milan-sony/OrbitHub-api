import express from "express";

import authRoutes from "./auth.js";
import taskRoutes from "./task.js";

const apiV1Router = express.Router();

// Base route for v1
apiV1Router.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "OrbitHub API v1",
    });
});

// Auth routes
apiV1Router.use("/auth", authRoutes);

// Tasks routes
apiV1Router.use("/tasks", taskRoutes);

export default apiV1Router;
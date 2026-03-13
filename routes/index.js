import express from "express";
import apiV1Router from "./api/index.js";

const router = express.Router()

// API v1 route
router.use("/api/v1", apiV1Router)

export const baseRoute = router.use("/api/health", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "API works properly",
        timestamp: new Date().toISOString()
    })
})
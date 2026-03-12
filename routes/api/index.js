import express from "express";

const apiV1Router = express.Router();

// Base route for v1
apiV1Router.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Orbit API v1",
    });
});

export default apiV1Router;
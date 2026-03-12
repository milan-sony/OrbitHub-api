import express from "express";

import { baseRoute } from "./routes/index.js";

// Creates an express app
const app = express();

// Base URL
app.use("/", baseRoute)

app.listen((process.env.PORT || 5000), () => {
    console.log(`\n🚀 Server listening on port: ${process.env.PORT || 5000}`);
});
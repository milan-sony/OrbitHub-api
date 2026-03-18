import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'

import { baseRoute } from "./routes/index.js";
import { connectDB } from "./configs/mongoDBConfig.js";

// Creates an express app
const app = express();

// Connect DB
connectDB();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config cookie parser
app.use(cookieParser())

// Config CORS
app.use(cors({
  origin: process.env.REACT_URL, // Allow this origin only
  credentials: true, // Allows to send cookies and authorization headers with the request
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow necessary headers
}));

// Base route
app.use("/", baseRoute);

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`\n🚀 Server listening on port: ${PORT}`);
});
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

import express from "express";
const app = express();

import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";
import tasksRouter from "./routes/tasks";

import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", tasksRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

async function shutdown() {
  try {
    console.log("Prisma is shuting down...");
    await prisma.$disconnect();
    server.close(() => {
      console.log("Server is shuting down...");
      process.exit(0);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default prisma;

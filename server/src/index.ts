import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

import express from "express";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
});

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

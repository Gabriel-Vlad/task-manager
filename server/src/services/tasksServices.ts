import prisma from "../index";
import type { Task } from "../generated/prisma";
import { BadRequest } from "../errors";
import { UniqueTaskId } from "../types/userTypes";
import { formatToYYMMDD } from "../utils/format-to-YYMMDD";

export const getAllTasksPrisma = async (userId: string): Promise<(Omit<Task, "dueDate"> & { dueDate: string })[]> => {
  let tasks: Task[] = await prisma.task.findMany({
    where: {
      userId: userId,
    },
  });
  const newTasks = tasks.map((task) => {
    return {
      ...task,
      dueDate: formatToYYMMDD(task.dueDate),
    };
  });
  return newTasks;
};

export const createTaskPrisma = async (userId: string, props: Partial<Task>): Promise<Task> => {
  const { title, description, dueDate, isImportant = false, status = "INCOMPLETE" } = props;

  if (!title || !description || !dueDate) {
    throw new BadRequest("Missing required fields");
  }

  const newDueDate = new Date(dueDate);

  const task: Task = await prisma.task.create({
    data: {
      title,
      description,
      dueDate: newDueDate,
      isImportant,
      status,
      user: {
        connect: { id: userId },
      },
    },
  });

  return task;
};

export const updateTaskPrisma = async ({ userId, taskId }: UniqueTaskId, props: Partial<Task>): Promise<Task> => {
  if (!props) {
    throw new BadRequest("Please provide at least a field to update");
  }

  const userTaskFromDb = await prisma.task.findUnique({
    where: {
      id_userId: {
        userId: userId,
        id: taskId,
      },
    },
  });

  if (!userTaskFromDb) {
    throw new BadRequest("Task does not exist");
  }

  const { title: oldTitle, description: oldDescription, dueDate: oldDueDate, isImportant: oldIsImportant, status: oldStatus } = userTaskFromDb;

  const { title = oldTitle, description = oldDescription, dueDate = oldDueDate, isImportant = oldIsImportant, status = oldStatus } = props;

  const task: Task = await prisma.task.update({
    data: {
      title,
      description,
      dueDate,
      isImportant,
      status,
    },
    where: {
      userId: userId,
      id: taskId,
    },
  });

  return task;
};

export const deleteTaskPrisma = async ({ userId, taskId }: UniqueTaskId): Promise<Task> => {
  const task = await prisma.task.delete({
    where: {
      id_userId: {
        userId: userId,
        id: taskId,
      },
    },
  });

  return task;
};

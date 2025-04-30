export enum TaskStatus {
  INCOMPLETE = "INCOMPLETE",
  COMPLETED = "COMPLETED",
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  isImportant: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  role: Role;
  tasks?: Task[] | undefined;
}

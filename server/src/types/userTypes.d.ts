export enum TaskStatus {
  INCOMPLETE = "INCOMPLETE",
  COMPLETED = "COMPLETED",
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
  tasks?: Task[] | undefined;
}

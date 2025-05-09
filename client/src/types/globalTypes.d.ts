import type { ReactNode } from "react";

export interface IPropsType {
  children?: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button";
}
export interface INavItems {
  label: string;
  icon: JSX.Element;
}

export interface IProfileModal {
  isOpen: boolean;
}

export interface INewTaskModal {
  isOpen: boolean;
  status: "idle" | "pending" | "error" | "success";
  error: Error | null;
}

export interface ITask {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  status: "INCOMPLETE" | "COMPLETED";
  isImportant?: boolean;
}

export interface ITaskInitialState {
  tasks: ITask[];
  error: Error | null;
  isSuccess: boolean | null;
  filteredTasks: ITask[];
}

export interface IAuthState {
  isLoggedIn: boolean;
  id: string | null;
  name: string | null;
  status: "idle" | "pending" | "error" | "success";
  error: Error | null;
}

export type IAction = Partial<Pick<IAuthState, "id" | "name">>;

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IEditTask extends ITask {
  isOpen: boolean;
  submitStatus: "idle" | "pending" | "error" | "success";
  error: Error | null;
}

export interface IEditTaskPayload {
  data: ITask;
  id: string;
}

export interface IPagination {
  page: number;
}

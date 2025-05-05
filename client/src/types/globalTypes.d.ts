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
}

export interface IAuthState {
  isLoggedIn: boolean;
  id: string | null;
  name: string | null;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

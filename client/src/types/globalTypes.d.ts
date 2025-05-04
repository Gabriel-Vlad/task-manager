import type { ReactNode } from "react";

export interface PropsType {
  children?: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button";
}
export interface NavItems {
  label: string;
  icon: JSX.Element;
}

export interface ProfileModal {
  isOpen: boolean;
}

export interface NewTaskModal {
  isOpen: boolean;
}

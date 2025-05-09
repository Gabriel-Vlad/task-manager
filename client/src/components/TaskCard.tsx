import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import type { ITask } from "../types/globalTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserTask } from "../api/tasks";
import { FormEvent } from "react";
import { openModal } from "../features/editTaskModal/editTaskModalSlice";
import { useAppDispatch } from "../hooks/redux-toolkit";

const TaskCard = (props: ITask) => {
  const { id, title, description, dueDate, status } = props;
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteUserTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDeleteTask = (e: FormEvent) => {
    e.preventDefault();
    deleteMutation.mutate(id!);
  };

  return (
    <div className="flex h-[13rem] max-w-[19rem] flex-col overflow-hidden rounded-xl border border-[rgb(90,90,90)] bg-[rgb(61,61,61)] px-4 py-4">
      <h1 className="font-fredoka text-xl font-medium text-white">{title}</h1>
      <p className="mt-2 h-[3rem] text-sm leading-tight text-white">{description}</p>
      <p className="font-fredoka mt-7 text-sm text-white">{dueDate}</p>
      <div className="mt-2 flex items-center justify-between">
        <button
          className={`rounded-[6rem] px-4 py-1.5 text-white transition-all duration-200 ease-in-out active:opacity-70 ${status === "COMPLETED" ? "bg-green-600/90 hover:bg-green-600" : "bg-red-600/90 hover:bg-red-600"}`}
        >
          {status === "COMPLETED" ? "Completed" : "Incomplete"}
        </button>
        <div className="flex items-center space-x-4">
          <MdEditDocument
            onClick={() => dispatch(openModal({ ...props }))}
            className="h-6 w-6 cursor-pointer text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-300"
          />
          <FaTrash
            onClick={handleDeleteTask}
            className="h-5 w-5 cursor-pointer text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

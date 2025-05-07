import { useQuery } from "@tanstack/react-query";
import { getAllUserTasks } from "../api/tasks";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux-toolkit";
import { setUserTasks, setUserTasksError } from "../features/userTasks/userTasks";
import TaskCard from "./TaskCard";
import { ITask } from "../types/globalTypes";

const TasksList = () => {
  const dispatch = useAppDispatch();

  const tasksQuery = useQuery({
    queryFn: getAllUserTasks,
    queryKey: ["tasks"],
  });

  const { data: tasks, isError, error, isLoading } = tasksQuery;

  useEffect(() => {
    if (isError) {
      dispatch(setUserTasksError(error));
    } else {
      dispatch(setUserTasks(tasks!));
    }
  }, [tasksQuery, dispatch, error, isError, tasks]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>There has been an error {tasksQuery.error.message}</div>;

  return (
    <>
      {tasks.map((task: ITask) => {
        const { id, title, description, dueDate, status } = task;
        return <TaskCard key={id} id={id} title={title} description={description} dueDate={dueDate} status={status} />;
      })}
    </>
  );
};

export default TasksList;

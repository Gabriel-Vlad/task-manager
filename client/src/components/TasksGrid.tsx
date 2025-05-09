import { useAppDispatch, useAppSelector } from "../hooks/redux-toolkit";
import { openTaskModal } from "../features/newTaskModal/newTaskModalSlice";
import TasksList from "./TasksList";
import { useQuery } from "@tanstack/react-query";
import { getAllUserTasks } from "../api/tasks";
import { useEffect } from "react";
import { setUserTasks, setUserTasksError } from "../features/userTasks/userTasks";

const titles: string[] = ["All Tasks", "Important!", "Completed!", "Do it Now"];

const TasksGrid = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.persistedState.auth);
  const { page } = useAppSelector((state) => state.pagination);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>There has been an error {tasksQuery.error.message}</div>;

  return (
    <article className="flex shrink-1 grow-1 flex-col overflow-hidden rounded-xl border border-[rgb(37,37,37)] bg-[rgb(33,33,33)]">
      <div className="mt-4 mb-4 flex items-center justify-between px-8 py-2">
        <div className="flex flex-col justify-between gap-2">
          <p className="font-fredoka text-3xl font-medium text-white">{titles[page]}</p>
          <div className="h-1 w-12 rounded-xl bg-green-500"></div>
        </div>

        <div
          onClick={() => dispatch(openTaskModal())}
          className={`relative h-12 w-12 cursor-pointer rounded-full border border-[rgb(37,37,37)] bg-[rgb(50,50,50)] duration-200 ease-in-out hover:bg-[rgb(58,58,58)] ${!isLoggedIn ? "pointer-events-none opacity-70" : ""}`}
        >
          <div className="translate absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-400" />
          <div className="translate absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-xl bg-gray-400" />
        </div>
      </div>

      <div className="mb-4 grid auto-rows-fr grid-cols-1 gap-4 overflow-y-auto px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoggedIn && <TasksList />}
        {/* <TaskCard
          title="Update Passwords"
          description="Review online accounts and update passwords for better security. Use a password manager too keep track."
          dueDate="13/10/2023"
        /> */}

        <div
          className={`group flex h-[13rem] max-w-[19rem] cursor-pointer items-center justify-center rounded-xl border border-dashed border-[rgb(90,90,90)] transition-colors duration-300 ease-in-out hover:bg-[rgb(38,38,38)] ${!isLoggedIn ? "pointer-events-none" : ""}`}
          onClick={() => dispatch(openTaskModal())}
        >
          <div className="flex items-center gap-2">
            <div className="relative h-5 w-5">
              <div className="absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-400 transition-colors duration-300 ease-in-out group-hover:bg-gray-300" />
              <div className="absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-xl bg-gray-400 transition-colors duration-300 ease-in-out group-hover:bg-gray-300" />
            </div>
            <p className="font-fredoka text-base font-medium text-gray-400 transition-colors duration-300 ease-in-out group-hover:text-gray-300">
              {isLoggedIn ? "Add new Task" : "Please sign up to create tasks"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TasksGrid;

import { useAppSelector } from "../hooks/redux-toolkit";
import type { ITask } from "../types/globalTypes";
import TaskCard from "./TaskCard";

const TasksList = () => {
  const { filteredTasks } = useAppSelector((state) => state.userTasks);

  return (
    <>
      {filteredTasks &&
        filteredTasks.map((task: ITask) => {
          return <TaskCard key={task.id} {...task} />;
        })}
    </>
  );
};

export default TasksList;

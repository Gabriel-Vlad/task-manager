import EditTaskModal from "../components/EditTaskModal";
import NewTaskModal from "../components/NewTaskModal";
import Sidebar from "../components/Sidebar";
import TasksGrid from "../components/TasksGrid";
import { useAppSelector } from "../hooks/redux-toolkit";

const Home = () => {
  const { isOpen: isOpenNewTask } = useAppSelector((state) => state.newTaskModal);
  const { isOpen: isOpenEditTask } = useAppSelector((state) => state.editTaskModal);

  // -- IMPORTANT --
  // -- LOGIN OR SIGN UP FOR THE SITE TO WORK PROPERLY
  // -- IMPORTANT --


  return (
    <>
      <main className="relative flex min-h-screen w-full shrink-1 grow-1 overflow-hidden py-[2.5rem]">
        <div className="relative mx-auto flex w-full max-w-[95vw] gap-[2.5rem]">
          <Sidebar />
          <TasksGrid />
        </div>

        {isOpenNewTask && <NewTaskModal />}
        {isOpenEditTask && <EditTaskModal />}
      </main>
    </>
  );
};

export default Home;

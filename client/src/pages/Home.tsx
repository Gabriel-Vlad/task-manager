import NewTaskModal from "../components/NewTaskModal";
import Sidebar from "../components/Sidebar";
import TasksGrid from "../components/TasksGrid";
import { useAppSelector } from "../hooks/redux-toolkit";

const Home = () => {
  const { isOpen } = useAppSelector((state) => state.newTaskModal);

  return (
    <>
      <main className="relative flex min-h-screen w-full shrink-1 grow-1 overflow-hidden py-[2.5rem]">
        <div className="mx-auto flex w-full max-w-[95vw] gap-[2.5rem]">
          <Sidebar />
          <TasksGrid />
        </div>

        {isOpen && <NewTaskModal />}
      </main>
    </>
  );
};

export default Home;

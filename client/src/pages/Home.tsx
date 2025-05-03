import NewTaskModel from "../components/NewTaskModal";
import Sidebar from "../components/Sidebar";
import TasksGrid from "../components/TasksGrid";

const Home = () => {
  return (
    <>
      <main className="relative flex min-h-screen w-full shrink-1 grow-1 overflow-hidden bg-black/90 py-[2.5rem]">
        <div className="mx-auto flex w-full max-w-[95vw] gap-[2.5rem]">
          <Sidebar />
          <TasksGrid />
        </div>
        {/* <NewTaskModel /> */}
      </main>
    </>
  );
};

export default Home;

//bg-[rgb(37,_37,_37)]

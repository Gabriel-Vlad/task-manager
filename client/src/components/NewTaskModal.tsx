import { useAppDispatch } from "../hooks/redux-toolkit";
import { closeTaskModal } from "../features/newTaskModal/newTaskModalSlice";
import { IoMdClose } from "react-icons/io";

const NewTaskModal = () => {
  const dispatch = useAppDispatch();

  return (
    <section className="absolute inset-0 z-10 overflow-hidden bg-black/50" onClick={() => dispatch(closeTaskModal())}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="absolute top-1/7 left-1/2 w-[33rem] -translate-x-1/2 rounded-2xl bg-[rgb(38,38,38)] px-8 py-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-fredoka text-xl font-medium text-white">Create a Task</h1>
          <IoMdClose
            className="mt-1 h-6 w-6 cursor-pointer text-white transition-colors duration-200 ease-in-out hover:text-white/90"
            onClick={() => dispatch(closeTaskModal())}
          />
        </div>
        <div className="mt-4">
          <label className="font-fredoka block text-base text-white">Title</label>
          <input
            type="text"
            placeholder="e.g. Watch a video from Fireship"
            className="mt-1.5 w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="font-fredoka block text-base text-white">Description</label>
          <textarea
            placeholder="e.g. Watch a video about Next.js"
            rows={4}
            className="mt-1.5 w-full resize-none rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="font-fredoka block text-base text-white">Date</label>
          <input
            type="date"
            placeholder="e.g. Watch a video from Fireship"
            className="mt-1.5 w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-gray-400 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <label className="font-fredoka block text-base text-white">Toggle Complected</label>
          <input type="checkbox" className="mt-1.5 rounded-lg" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <label className="font-fredoka block text-base text-white">Toggle Important</label>
          <input type="checkbox" className="mt-1.5 rounded-lg" />
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 rounded-3xl bg-blue-400 px-8 py-3 text-white transition-opacity duration-200 ease-in-out hover:opacity-80"
            onClick={(e) => e.preventDefault()}
          >
            <div className="relative h-4 w-4">
              <div className="absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white" />
              <div className="absolute top-1/2 left-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-xl bg-white" />
            </div>
            Create Task
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewTaskModal;

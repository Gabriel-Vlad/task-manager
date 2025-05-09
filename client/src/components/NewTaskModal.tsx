import { useAppDispatch } from "../hooks/redux-toolkit";
import { closeTaskModal, createTaskError, createTaskStart, createUserSuccess } from "../features/newTaskModal/newTaskModalSlice";
import { IoMdClose } from "react-icons/io";
import type { ITask } from "../types/globalTypes";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserTask } from "../api/tasks";

const NewTaskModal = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<ITask>({
    title: "",
    description: "",
    dueDate: "",
    status: "INCOMPLETE",
    isImportant: false,
  });

  const createMutation = useMutation({
    mutationFn: createUserTask,
    onMutate: () => dispatch(createTaskStart()),
    onSuccess: () => {
      dispatch(createUserSuccess());
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setForm({
        title: "",
        description: "",
        dueDate: "",
        status: "INCOMPLETE",
        isImportant: false,
      });
      dispatch(closeTaskModal());
    },
    onError: (error) => dispatch(createTaskError(error)),
  });

  const changeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ITask) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ ...form });
  };

  return (
    <section className="absolute inset-0 z-10 overflow-hidden bg-black/50">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
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
            name="title"
            id="title"
            value={form.title}
            placeholder="e.g. Watch a video from Fireship"
            className="mt-1.5 w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
            onChange={(e) => changeInput(e, e.target.name as keyof ITask)}
          />
        </div>

        <div className="mt-6">
          <label className="font-fredoka block text-base text-white">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="e.g. Watch a video about Next.js"
            value={form.description}
            rows={4}
            maxLength={200}
            className="mt-1.5 w-full resize-none rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
            onChange={(e) => changeInput(e, e.target.name as keyof ITask)}
          />
        </div>

        <div className="mt-6">
          <label className="font-fredoka block text-base text-white">Date</label>
          <input
            name="dueDate"
            id="dueDate"
            type="date"
            value={form.dueDate}
            placeholder="e.g. Watch a video from Fireship"
            className="mt-1.5 w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-gray-400 focus:outline-none"
            onChange={(e) => changeInput(e, e.target.name as keyof ITask)}
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <label className="font-fredoka block text-base text-white">Toggle Complected</label>
          <input
            name="status"
            id="status"
            type="checkbox"
            className="mt-1.5 rounded-lg"
            checked={form.status === "COMPLETED"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({
                ...prev,
                ["status"]: e.target.checked === true ? "COMPLETED" : "INCOMPLETE",
              }))
            }
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <label className="font-fredoka block text-base text-white">Toggle Important</label>
          <input
            name="isImportant"
            id="isImportant"
            type="checkbox"
            checked={form.isImportant === true}
            className="mt-1.5 rounded-lg"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm((prev) => ({
                ...prev,
                ["isImportant"]: e.target.checked === true ? true : false,
              }))
            }
          />
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 rounded-3xl bg-blue-400 px-8 py-3 text-white transition-opacity duration-200 ease-in-out hover:opacity-80 active:opacity-70"
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

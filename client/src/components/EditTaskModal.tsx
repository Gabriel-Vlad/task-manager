import { useAppDispatch, useAppSelector } from "../hooks/redux-toolkit";
import { IoMdClose } from "react-icons/io";
import type { ITask } from "../types/globalTypes";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { closeModal, editTaskError, editTaskStart, editTaskSuccess } from "../features/editTaskModal/editTaskModalSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserTask } from "../api/tasks";
import yyMmDdToHtmlDate from "../utils/format-to-valid-date";

const EditTaskModal = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { id, title, description, dueDate, status, isImportant } = useAppSelector((state) => state.editTaskModal);
  const { page } = useAppSelector((state) => state.pagination);

  const [form, setForm] = useState<ITask>({
    title,
    description,
    dueDate: yyMmDdToHtmlDate(dueDate),
    status,
    isImportant,
  });

  const editMutation = useMutation({
    mutationFn: editUserTask,
    onMutate: () => dispatch(editTaskStart()),
    onSuccess: () => {
      dispatch(editTaskSuccess({ page: page }));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      dispatch(closeModal());
    },
    onError: (error) => dispatch(editTaskError(error)),
  });

  const changeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ITask) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    editMutation.mutate({ data: { ...form }, id: id! });
  };

  return (
    <section className="absolute inset-0 z-10 overflow-hidden bg-black/50">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="absolute top-1/7 left-1/2 w-[33rem] -translate-x-1/2 rounded-2xl bg-[rgb(38,38,38)] px-8 py-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-fredoka text-xl font-medium text-white">Edit Task</h1>
          <IoMdClose
            className="mt-1 h-6 w-6 cursor-pointer text-white transition-colors duration-200 ease-in-out hover:text-white/90"
            onClick={() => dispatch(closeModal())}
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
            Apply changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditTaskModal;

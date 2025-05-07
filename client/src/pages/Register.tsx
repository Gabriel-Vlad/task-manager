import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import { useAppDispatch } from "../hooks/redux-toolkit";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { IUser } from "../types/globalTypes";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../api/user";
import { signInStart, signInError, signInSuccess } from "../features/authentication/authenticationSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const signUpMutation = useMutation({
    mutationFn: createUser,
    onMutate: () => dispatch(signInStart()),
    onSuccess: (data) => {
      const { id, name } = data!;
      dispatch(signInSuccess({ id, name }));
      setForm({
        name: "",
        email: "",
        password: "",
      });
      navigate("/");
    },
    onError: (error) => {
      dispatch(signInError(error));
    },
  });

  const changeInput = (e: ChangeEvent<HTMLInputElement>, field: keyof IUser) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signUpMutation.mutate({ ...form });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="absolute top-1/2 left-1/2 flex max-w-[29rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-xl border border-[rgb(50,50,50)] bg-[rgb(38,38,38)] px-5 py-5 text-white"
      >
        <h1 className="font-fredoka text-xl font-medium">Welcome to your Task Manager!</h1>
        <p className="font-fredoka mt-1 text-sm leading-tight text-gray-400">
          Register to get full access to our product and manage your tasks in a calculated simple way.
        </p>

        <Link to="/" className="absolute top-5 right-4">
          <IoMdArrowBack className="mt-1 h-5 w-5 transition-opacity duration-200 ease-in-out hover:opacity-80" />
        </Link>

        <div className="mt-3 flex flex-col justify-start gap-1">
          <label htmlFor="name" className="text-lg text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            placeholder="Nicusor Dan"
            className="w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
            onChange={(e) => changeInput(e, "name")}
          />
        </div>

        <div className="mt-3 flex flex-col justify-start gap-1">
          <label htmlFor="email" className="text-lg text-white">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={form.email}
            placeholder="nicusordan@gmail.com"
            className="w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
            onChange={(e) => changeInput(e, "email")}
          />
        </div>

        <div className="mt-3 flex flex-col justify-start gap-1">
          <label htmlFor="password" className="text-lg text-white">
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            value={form.password}
            placeholder="Password123"
            className="w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
            onChange={(e) => changeInput(e, "password")}
          />
        </div>

        <button
          type="submit"
          className="group mt-8 flex cursor-pointer items-center justify-center gap-1 rounded-4xl bg-emerald-500 px-4 py-2.5 transition-colors duration-200 ease-in-out hover:bg-emerald-600"
        >
          <p className="font-fredoka text-lg transition-colors duration-200 ease-in-out group-hover:text-white/90">Sign up</p>
          <FaLongArrowAltRight className="mt-1 h-4 w-4 transition-colors duration-200 ease-in-out group-hover:text-white/90" />
        </button>
      </form>
    </main>
  );
};

export default Register;

import { IoIosLogIn } from "react-icons/io";
import { Link } from "react-router";

const Login = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <form className="absolute top-1/2 left-1/2 flex max-w-[29rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-xl border border-[rgb(50,50,50)] bg-[rgb(38,38,38)] px-5 py-5 text-white">
        <h1 className="font-fredoka text-xl font-medium">Welcome back to your Task Manager!</h1>
        <p className="font-fredoka mt-1 text-sm leading-tight text-gray-400">
          Login to get full access to your account, arrange and complete tasks and manage your time well.
        </p>

        <div className="mt-3 flex flex-col justify-start gap-1">
          <label htmlFor="name" className="text-lg text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nicusor Dan"
            className="w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
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
            placeholder="nicusordan@gmail.com"
            className="w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
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
            placeholder="Password123"
            className="w-full rounded-lg bg-[rgb(22,22,22)] px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="group mt-8 flex cursor-pointer items-center justify-center gap-2 rounded-4xl bg-emerald-500 px-4 py-2.5 transition-colors duration-200 ease-in-out hover:bg-emerald-600"
          onClick={(e) => e.preventDefault()}
        >
          <p className="font-fredoka text-lg transition-colors duration-200 ease-in-out group-hover:text-white/90">Sign in</p>
          <IoIosLogIn className="mt-1 h-5 w-5 transition-colors duration-200 ease-in-out group-hover:text-white/90" />
        </button>

        <p className="mx-auto mt-3 text-center text-sm">
          Don't have an account?&nbsp;
          <Link to="/auth/register" className="text-blue-400 underline underline-offset-2">
            Sign Up
          </Link>{" "}
          here
        </p>
      </form>
    </main>
  );
};

export default Login;

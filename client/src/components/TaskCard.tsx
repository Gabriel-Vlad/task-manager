import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";

const TaskCard = () => {
  return (
    <div className="flex max-w-[19rem] flex-col overflow-hidden rounded-xl border border-[rgb(90,90,90)] bg-[rgb(61,61,61)] px-4 py-4">
      <h1 className="font-fredoka text-xl font-medium text-white">
        Update Passwords
      </h1>
      <p className="mt-2 max-h-[3rem] text-sm leading-tight text-white">
        Review online accounts and update passwords for better security. Use a
        password manager too keep track.
      </p>
      <p className="font-fredoka mt-6 text-sm text-white">13/10/2023</p>
      <div className="mt-2 flex items-center justify-between">
        <button className="rounded-[6rem] bg-green-600/90 px-4 py-1.5 text-white transition-colors duration-200 ease-in-out hover:bg-green-600">
          Completed
        </button>
        <div className="flex items-center space-x-4">
          <MdEditDocument className="h-6 w-6 cursor-pointer text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-300" />
          <FaTrash className="h-5 w-5 cursor-pointer text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

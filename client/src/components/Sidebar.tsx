import ProfilePicture from "../assets/images/ProfilePicture.jpg";
import type { NavItems } from "../types/globalTypes";
import { AiFillHome } from "react-icons/ai";
import { FaTasks, FaClipboardList } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../hooks/redux-toolkit";
import { openProfileModal, closeProfileModal } from "../features/profileModal/profile-modal";
import ProfileModal from "./ProfileModal";

const navItems: NavItems[] = [
  {
    label: "All Tasks",
    icon: <AiFillHome className="h-5 w-5 text-gray-400" />,
  },
  { label: "Important!", icon: <FaTasks className="h-5 w-5 text-gray-400" /> },
  {
    label: "Completed!",
    icon: <IoMdCheckmark className="h-5 w-5 text-gray-400" />,
  },
  {
    label: "Do it Now",
    icon: <FaClipboardList className="h-5 w-5 text-gray-400" />,
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.profileModal);

  const handleOpenProfileModal = () => {
    if (!isOpen) {
      dispatch(openProfileModal());
    } else {
      dispatch(closeProfileModal());
    }
  };

  return (
    <nav className="mx-auto flex w-[13rem] flex-col rounded-xl border-2 border-[rgb(37,_37,_37)] bg-[rgb(33,33,33)]">
      <div
        className="relative mx-auto my-4 flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 transition-colors duration-1000 ease-in-out hover:bg-[rgb(25,25,25)]"
        onClick={handleOpenProfileModal}
      >
        <div className="h-14 w-14">
          <img src={ProfilePicture} alt="Pfp" className="h-auto w-full rounded-full object-contain" />
        </div>
        <div className="font-fredoka w-[4rem] text-lg leading-tight text-white">Stana Vlad</div>

        {isOpen && <ProfileModal />}
      </div>

      <ul className="mt-[11rem]">
        {navItems.map((info, index) => {
          return (
            <li key={index} className={`slide-bg my-2 flex cursor-pointer items-center gap-4 px-8 py-2 ${index === 0 ? "active relative" : ""}`}>
              {info.icon}
              <p className="font-fredoka grow-1 text-base font-medium text-gray-400">{info.label}</p>

              {index === 0 && <div className="absolute top-0 right-0 bottom-0 w-1 rounded-tl-xl rounded-bl-xl bg-green-500"></div>}
            </li>
          );
        })}
      </ul>

      {/* <div className="group my-6 mt-auto inline-flex h-full max-h-fit w-full shrink-1 cursor-pointer items-center justify-center gap-3 px-4">
        <GoSignOut className="h-6 w-6 text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-gray-200" />
        <p className="font-fredoka text-xl text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-gray-200">
          Sign Out
        </p>
      </div> */}
    </nav>
  );
};

export default Sidebar;

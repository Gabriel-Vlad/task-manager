import ProfilePicture from "../assets/images/ProfilePicture.jpg";
import { IoIosSettings } from "react-icons/io";
import { HiLogout } from "react-icons/hi";
import { useAppDispatch } from "../hooks/redux-toolkit";
import { logout } from "../features/authentication/authenticationSlice";
import { logoutUser } from "../api/user";

const ProfileModal = () => {
  const dispatch = useAppDispatch();

  const handleLogoutUser = async () => {
    await logoutUser();
    dispatch(logout());
  };

  return (
    <div className="absolute top-full z-20 mt-2 h-[11rem] w-[20rem] rounded-xl bg-white py-4">
      <div className="inline-flex items-center gap-2 px-5">
        <div className="h-10 w-10">
          <img src={ProfilePicture} alt="pfp" className="h-auto w-full rounded-full object-contain" />
        </div>
        <div className="">
          <div className="block text-[12px]">Maclinz Maclinz</div>
          <div className="block text-[12px] text-gray-400">maclinzmaclinz@gmail.com</div>
        </div>
      </div>

      <ul className="mt-5">
        <li className="flex items-center gap-4 px-8 py-2.5 transition-colors duration-200 ease-in-out hover:bg-gray-300/50">
          <IoIosSettings className="h-4 w-4 text-gray-400" />
          <p className="text-[12px] text-gray-400">Manage account</p>
        </li>
        <li
          onClick={handleLogoutUser}
          className="flex items-center gap-4 px-8 py-2.5 transition-colors duration-200 ease-in-out hover:bg-gray-300/50"
        >
          <HiLogout className="h-4 w-4 text-gray-400" />
          <p className="text-[12px] text-gray-400">Sign out</p>
        </li>
      </ul>
    </div>
  );
};

export default ProfileModal;

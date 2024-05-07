/* eslint-disable no-unused-vars */
import React from "react";
import { FaHome } from "react-icons/fa";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link , useNavigate} from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const LeftSidebar = () => {
  const {user} = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
      try {
          const res = await axios.get(`${USER_API_END_POINT}/logout`);
          dispatch(getUser(null));
          dispatch(getOtherUsers(null));
          dispatch(getMyProfile(null));
          navigate('/login');
          toast.success("user logged out successfully");
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <div className="w-[20%]">
      <div className="m-6">
        {/* image div */}
        <div>
          <img
            className="ml-4"
            width={"42px"}
            src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?w=740&t=st=1714184706~exp=1714185306~hmac=d2dc090b56a41a9444934d0db8cf5be68ab3a7051e8e20d332982c7bfa492b8f"
            alt=""
          />
        </div>

        <Link to="/" className="my-6">
          <div className="flex items-center my-2 px-4 py-2 hover:bg-slate-200 hover:cursor-pointer gap-3 rounded-full">
            <div>
              <FaHome size="24px" />
            </div>
            <h1 className="font-bold text-lg">Home</h1>
          </div>

          <div className="flex items-center my-2 px-4 py-2 hover:bg-slate-200 hover:cursor-pointer gap-3 rounded-full">
            <div>
              <CiHashtag size="24px" />
            </div>
            <h1 className="font-bold text-lg">Explore</h1>
          </div>

          <div className="flex items-center my-2 px-4 py-2 hover:bg-slate-200 hover:cursor-pointer gap-3 rounded-full">
            <div>
              <IoIosNotificationsOutline size="24px" />
            </div>
            <h1 className="font-bold text-lg">Notifications</h1>
          </div>

          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-2 px-4 py-2 hover:bg-slate-200 hover:cursor-pointer gap-3 rounded-full"
          >
            <div>
              <CiUser size="24px" />
            </div>
            <h1 className="font-bold text-lg">Profile</h1>
          </Link>

          <div className="flex items-center my-2 px-4 py-2 hover:bg-slate-200 hover:cursor-pointer gap-3 rounded-full">
            <div>
              <CiBookmark size="24px" />
            </div>
            <h1 className="font-bold text-lg">Bookmarks</h1>
          </div>

          <div onClick={logoutHandler} className="flex items-center my-2 px-4 py-2 hover:bg-slate-200 hover:cursor-pointer gap-3 rounded-full">
            <div>
              <AiOutlineLogout size="24px" />
            </div>
            <h1 className="font-bold text-lg">Logout</h1>
          </div>
          <button className="px-4 py-2 border-none text-lg bg-[#1D9BF0] rounded-full w-full text-white font-bold">
            Post
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;

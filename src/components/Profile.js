/* eslint-disable no-unused-vars */
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile";
import { useSelector , useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  const followAndUnfollowHandler = async () => {
    if(user.following.includes(id)){
        // unfollow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        
    }else{
        // follow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
}

  return (
    <div className="w-[50%] mt-5 border-l border-r border-gray-200">
      <div>
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="rounded-full font-bold text-xl cursor-pointer hover:bg-slate-200 p-3"
          >
            <IoMdArrowRoundBack />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">{profile?.name}</h1>
            <p>50 posts</p>
          </div>
        </div>
        <img
          className="h-[220px] w-full"
          src="https://img.freepik.com/free-photo/futuristic-business-scene-with-ultra-modern-ambiance_23-2151003787.jpg?t=st=1714211569~exp=1714215169~hmac=e848f4580499f60e9e16aa8690754e9848ec60426cd5f8bf922f32e312be313d&w=996"
          alt="profile"
        />
        <div className="absolute top-52 ml-3 border-4 border-white rounded-full">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
            size="135"
            round={true}
          />
        </div>
        <div className="text-right mt-2">
          {profile?._id === user?._id ? (
            <button className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400">
              Edit Profile
            </button>
          ) : (
            <button onClick={followAndUnfollowHandler} className="px-4 py-1 bg-black text-white rounded-full">
              {user.following.includes(id) ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className=" m-4">
          <h1 className="font-bold text-2xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            YouTuber: 1 million+ subs⚡️TIME Magazine’s Next Generation Leaders
            2023 • Traveller • Vegetarian • Be the change you want to see
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

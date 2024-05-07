import React from "react";
import Avatar from "react-avatar";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {  getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const {user} = useSelector(store => store.user)
  const {isActive} = useSelector(store => store.tweet)
  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description , id:user?._id },{
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        dispatch(getRefresh());
      if (res.data.success) {
        toast.success("tweet created successfully");
      }
    } catch (error) {
      toast.error("fields are required"+error.response.data.message);
      console.log(error);
    }
    setDescription("")
  };
  
  const forYouHandler = () => {
     dispatch(getIsActive(true));
  }

  const followingHandler = () => {
    dispatch(getIsActive(false));
  }
  
  return (
    <div className="w-[100%]">
      <div className="m-3">
        <div className=" flex justify-evenly items-center border-b border-gray-300 ">
          <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-700" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full px-4 py-3 text-center`}>
            <h1 className="font-semibold text-lg text-gray-600 ">For You</h1>
          </div>
          <div onClick={followingHandler} className={` ${!isActive ? "border-b-4 border-blue-700" : "border-b-4 border-transparent"} cursor-pointer  hover:bg-gray-200 w-full px-4 py-3 text-center`}>
            <h1 className="font-semibold text-lg text-gray-600 text-center">
              Following
            </h1>
          </div>
        </div>
        <div className="p-2">
          <div className="flex items-center">
            <Avatar
              src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
              size="50"
              round={true}
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none border-none text-lg ml-3"
              type="text"
              placeholder="What is happining?!"
            />
          </div>
          <div className="flex justify-between my-4 border-b border-gary-300">
            <div className="mt-3 text-lg font-semibold">
              <FaImage />
            </div>
            <button
              onClick={submitHandler}
              className="px-5 py-1 border-none text-lg bg-[#1D9BF0] rounded-full  text-white "
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

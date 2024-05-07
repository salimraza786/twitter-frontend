import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import {timeSince} from "../utils/constant";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      console.log(res);
      dispatch(getRefresh());
      toast.success("Tweet deleted succesfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="border-b border-gray-200 ">
      <div className="m-4">
        <div className="flex items-center">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
            size="50"
            round={true}
          />
          <div className="ml-3 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-2">{`@${tweet?.userDetails[0]?.username} . ${timeSince(tweet?.createdAt)}`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className="flex justify-between my-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full hover:bg-green-200 cursor-pointer">
                  <FaRegComment size="21px" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="p-2 rounded-full hover:bg-red-200 cursor-pointer"
                >
                  <CiHeart size="25px" />
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full hover:bg-blue-200 cursor-pointer">
                  <CiBookmark size="25px" />
                </div>
                <p>0</p>
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center gap-2"
                >
                  <div className="p-2 rounded-full hover:bg-red-600 cursor-pointer">
                    <MdDeleteOutline size="25px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;

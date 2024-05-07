import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
const RightSidebar = ({ otherUsers }) => {
  return (
    <div className="w-[28%] px-4">
      <div className="mt-4">
        <div className="p-2 bg-gray-200 rounded-full outline-none flex items-center">
          <CiSearch />
          <input
            className="outline-none bg-transparent px-2"
            type="text"
            placeholder="search"
          />
        </div>
        <div className="mt-5  bg-slate-200 py-4 px-2 rounded-2xl ">
          <h1 className="font-bold text-lg">Who to follow</h1>
          {otherUsers?.map((user) => {
            return (
              <div key={user?._id} className="flex items-center gap-3 mt-5 ">
                <Avatar
                  src="https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg"
                  size="50"
                  round={true}
                />
                <div className="">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-gray-500 text-sm ml-2">
                    {`@${user?.username}`}
                  </p>
                </div>
                <div>
                  <Link to = {`/profile/${user?._id}`}>
                    <button className="px-6 py-1 border-none text-lg bg-[#1D9BF0] rounded-full  text-white ">
                      Profile
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

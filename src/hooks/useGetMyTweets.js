/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
import { useSelector } from "react-redux";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh , isActive} = useSelector((store) => store.tweet);

  const fetchMyTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };
  const followingTweetHandler = async () => {
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweets/${id}`,{
          withCredentials: true,
        });
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isActive) {
      fetchMyTweets();
    } else {
      followingTweetHandler();
    }
    
    
  }, [refresh , isActive]);
};

export default useGetMyTweets;

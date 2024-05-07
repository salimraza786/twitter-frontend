/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet , useNavigate} from 'react-router-dom'
import useOtherUsers from '../hooks/useOtherUsers'
import {useSelector} from 'react-redux'
import useGetMyTweets from '../hooks/useGetMyTweets'
import { useEffect } from 'react'

const Home = () => {
  const { user, otherUsers } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  },[]);
  // custom hook
  
  useOtherUsers(user?._id)
  useGetMyTweets(user?._id)
  
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSidebar/>
      <Outlet/>
      <RightSidebar otherUsers = {otherUsers }/>
    </div>
  )
}

export default Home

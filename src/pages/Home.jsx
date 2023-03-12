import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

// import Sidebar from './../components/Sidebar';
// import UserProfile from '../components/UserProfile';
import { Sidebar, UserProfile } from './../components';
import Pins from './Pins';
import { userQuery } from './../utils/data';
import { client } from './../client';
import logo from './../assets/logo.png';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  // If user doesn't exist in local storage
  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  console.log('User info:');
  console.log(userInfo);

  useEffect(() => {
    // Write a sanity query
    const query = userQuery(userInfo.id);

    client.fetch(query).then(data => {
      // Set one specific user
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    // Set the
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duratio
   ease-out"
    >
      {/* Two different side bars */}
      <div
        className="hidden md:flex h-screen flex-initial
      "
      >
        {/* Mobile Sidebar */}
        {/* If the user exists pass the user otherwise pass false */}
        <Sidebar user={user && user} />
      </div>
      {/* For mobile */}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {/* <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-28" />
          </Link> */}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            {/* Desktop Sidebar */}
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      {/*  */}
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          {/* Render element */}
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
          <Route />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';

const HomeNavBar = () => {
  const [onHome, setOnHome] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lapBar, setlapBar] = useState(false);
  return (
    <>
      <div
        className={`bg-white flex items-center justify-between text-primary fixed z-40 md:flex-col left-0 right-0 top-0 px-10 py-3 shadow-md border border-[#71A9F7]  ${
          lapBar
            ? 'md:right-0 md:left-auto md:top-[49px] md:bottom-0 transition-all duration-500'
            : 'md:right-[-280px] md:top-[49px] md:bottom-0 md:left-auto transition-all duration-500'
        }`}
      >
        <div className="text-xl font-bold md:hidden">MedStem</div>
        <div>
          <ul className="flex items-center gap-10 md:gap-2 md:flex-col text-[18px] md:items-start">
            <li
              className={`${
                onHome ? 'font-bold border-b border-primary' : ''
              } cursor-pointer`}
            >
              Home
            </li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Find a Doctor</li>
          </ul>
        </div>
        <div>
          {!isLoggedIn ? (
            <ul className="flex items-center text-[18px] gap-10 md:flex-col md:gap-2">
              <li className="cursor-pointer">Log In</li>
              <li className="border border-primary px-4 py-1.5 rounded-xl cursor-pointer hover:bg-[#d2dbff] hover:border-white">
                Sign Up
              </li>
            </ul>
          ) : (
            <ul className="flex items-center text-[18px] gap-10 md:flex-col md:gap-2">
              <li className="cursor-pointer">
                <FiIcons.FiSearch />
              </li>
              <li className="cursor-pointer">Appointment</li>
              <li className="cursor-pointer">Account</li>
            </ul>
          )}
        </div>
      </div>
      <div className="bg-white hidden md:flex items-center justify-between text-primary fixed left-0 right-0 top-0 px-10 py-3 shadow-md border border-[#71A9F7]">
        <div className="font-bold">MedStem</div>
        {!lapBar ? (
          <div className="text-secondary" onClick={() => setlapBar(true)}>
            <FaIcons.FaBars />
          </div>
        ) : (
          <div className="text-secondary" onClick={() => setlapBar(false)}>
            <FaIcons.FaTimes />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeNavBar;

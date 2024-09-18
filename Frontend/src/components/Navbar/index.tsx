"use client";
import { AppLogo } from "@/assets/svgs";
const Navbar = () => {
  return (
    <header>
      <nav className="flex bg-black items-center justify-between h-20 px-4 pr-8 z-50 fixed w-full">
        <div className="ml-10 flex justify-center items-center gap-4 cursor-pointer">
          <span>
            <AppLogo size="24px" />
          </span>
          <span className="font-medium text-[24px] text-white">
            Jobs Manager
          </span>
        </div>
        <div className="flex gap-4 mr-10">
          <button className="text-white  font-medium mx-4" onClick={() => {}}>
            Jobs Overview
          </button>
          <button className="text-white font-medium mx-4" onClick={() => {}}>
            Jobs Details
          </button>
          <button className="text-white  font-medium mx-4" onClick={() => {}}>
            Our Support
          </button>
          <button
            className="text-white  font-medium border  border-1 border-solid border-white px-4 py-2 rounded-md"
            onClick={() => {}}
          >
            Log In
          </button>
          <button
            className="text-white font-medium  bg-[#00A795] px-4 py-2 rounded-md"
            onClick={() => {}}
          >
            Register Now
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

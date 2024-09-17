import React from "react";
import { Button } from "../ui/button";

interface HeadingProps {
  main: string;
  sub: string;
}
const Heading = ({ main, sub }: HeadingProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-semibold text-[32px]">{main}</h1>
        <h1 className="font-normal text-[16px] text-gray-500">{sub}</h1>
      </div>
      <button className="text-white font-medium  bg-[#00A795] px-4 py-2 rounded-md">
        Register Now
      </button>
    </div>
  );
};

export default Heading;

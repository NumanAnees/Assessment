"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface HeadingProps {
  main: string;
  sub: string;
  handleAddJob: () => void;
}

const Heading = ({ main, sub, handleAddJob }: HeadingProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-semibold text-[32px]">{main}</h1>
        <h1 className="font-normal text-[16px] text-gray-500">{sub}</h1>
      </div>
      <Button onClick={handleAddJob}>+ Add Job</Button>
    </div>
  );
};

export default Heading;

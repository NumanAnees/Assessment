"use client";
import React from "react";
import { addJob } from "@/actions/jobs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface HeadingProps {
  main: string;
  sub: string;
}

const Heading = ({ main, sub }: HeadingProps) => {
  const router = useRouter();

  const handleAddJob = async () => {
    try {
      await addJob();
      router.refresh();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

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

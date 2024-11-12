"use client";
import { HouseSimple } from "@phosphor-icons/react";
import { Calendar } from "@phosphor-icons/react";

export default function AppMainBar() {
  return (
    <div className="px-6 w-full h-12 bg-white flex justify-between items-center absolute bottom-0 ">
      <HouseSimple color="black" />
      <HouseSimple color="black" />
      <Calendar color="black" />
      <Calendar color="black" />
    </div>
  );
}

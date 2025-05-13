import React from "react";
import { Icons } from "./Icons";

const Chip = ({
  title,
  isActive,
  width = 9,
  containerStyle,
  handleClick,
  size = "text-[14px]",
}) => {
  return (
    <div
      onClick={handleClick}
      className={`rounded-full ${containerStyle} cursor-pointer flex items-center justify-center gap-2 p-3.5 font-[500] leading-[14px] hover:bg-[#FAFAFA] ${
        isActive ? "bg-[#121212]" : " border border-black-100"
      }`}
    >
      {/* <Icons.dot size={width} /> */}
      <span className={`text-[#121212] whitespace-nowrap font-medium ${size} ${isActive ? "text-white" : "text-[#121212]"}`}>
        {title}
      </span>
    </div>
  );
};

export default Chip;

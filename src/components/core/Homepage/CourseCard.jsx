import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div
      className={`w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-yellow-300 shadow-[12px_12px_0_0]"
          : "bg-richblack-700"
      }  text-white h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3 font-medium">
        <div
          className={` ${
            currentCard === cardData?.heading && "text-richblack-900 font-medium"
          } font-semibold text-[20px]`}
        >
          {cardData?.heading}
        </div>

        {/* <div className=`${currentCard === cardData?.heading && "text-richblack-900"}` "font-medium"> */}
        <div
          className={`font-medium ${
            currentCard === cardData?.heading ? "text-richblack-900" : "text-white"
          }`}
        >
        {cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-500" : "text-white"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
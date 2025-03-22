import React from 'react'
import CTAButton from "../../../components/core/Homepage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div className='bg-yellow-300 px-6 py-6 rounded-lg md:px-12 lg:px-20'>
      <div className="flex flex-col lg:flex-row gap-10 md:gap-20 items-center">
        
        {/* Instructor Image */}
        <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] flex justify-center">
          <img
            src={Instructor}
            alt="Instructor"
            className="rounded-full w-[80%] sm:w-[70%] md:w-[60%] lg:w-full"
          />
        </div>
        
        {/* Content Section */}
        <div className="w-full lg:w-[50%] flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-medium text-richblack-900">
            Become an <HighlightText text={"Instructor"} />
          </h1>

          <p className="font-medium text-base sm:text-lg text-justify md:text-left text-richblack-700 w-full sm:w-[90%]">
            Instructors from around the world teach millions of students on
            Study4U. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit mx-auto lg:mx-0">
            <CTAButton active={false} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default InstructorSection;

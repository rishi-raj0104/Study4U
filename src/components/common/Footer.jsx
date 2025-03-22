import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
// Images

import logo2 from "../../assets/Logo/study4u_logo_light.png";
// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
// const Resources = [
//   "Articles",
//   "Blog",
//   "Chart Sheet",
//   "Code challenges",
//   "Docs",
//   "Projects",
//   "Videos",
//   "Workspaces",
// ];
const Resources = [
  "Articles",
  "Docs",
  "Projects",
  "Videos",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
// const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-yellow-300 w-full">
      {/* <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-900 leading-6 mx-auto relative py-14 font-medium"> */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between w-full px-6 md:px-12 text-richblack-900 leading-6 mx-auto relative py-10 font-medium ">  
        <div className="border-b w-full flex flex-col lg:flex-row pb-5 border-richblack-900 gap-6">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-col  lg:flex-row justify-between lg:border-r lg:border-richblack-900 pl-3 lg:pr-5 gap-3 items-center lg:items-start">
          <div className="w-[30%] flex flex-col gap-3 mb-7 lg:pl-0 items-center md:items-center sm:items-start">
              <img src={logo2} alt="" className="object-contain" />
              <h1 className="bg-richblack-900 text-white rounded-full font-semibold text-[16px] px-4 py-1 w-fit border border-yellow-300">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer text-richblack-800 font-medium hover:text-yellow-300 hover:bg-richblack-900 hover:rounded-full hover:px-4 hover:py-1 hover:w-auto transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-lg justify-center sm:justify-start">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
              <div></div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0 flex flex-col items-center">
              <h1 className="bg-richblack-900 text-white rounded-full px-4 py-1 w-fit border border-yellow-300 font-semibold text-[16px] ">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer text-richblack-800 font-medium transition-all duration-200  hover:text-yellow-300 hover:bg-richblack-900 hover:rounded-full hover:px-4 hover:py-1 hover:w-auto"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="bg-richblack-900 text-white rounded-full px-4 py-1 w-fit border border-yellow-300 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer text-richblack-800 font-medium hover:text-yellow-300 hover:bg-richblack-900 hover:rounded-full hover:px-4 hover:py-1 hover:w-auto transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0 flex flex-col items-center">
              <h1 className="bg-richblack-900 text-white rounded-full px-4 py-1 w-fit border border-yellow-300 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer text-richblack-800 font-medium hover:text-yellow-300 hover:bg-richblack-900 hover:rounded-full hover:px-4 hover:py-1 hover:w-auto transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              {/* <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1> */}

              {/* <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div> */}
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-col lg:flex-row justify-between pl-3 lg:pl-5 gap-3 items-center lg:items-start">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0 flex flex-col items-center">
                  <h1 className="bg-richblack-900 text-white rounded-full px-4 py-1 w-fit border border-yellow-300 font-semibold  text-[16px] text-center ">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2 items-center">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer  transition-all duration-200 hover:text-yellow-300 hover:bg-richblack-900 hover:rounded-full hover:px-4 hover:py-1 hover:w-auto"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-screen-xl px-4 sm:px-6 lg:px-10 text-richblack-900 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full font-medium">
          <div className="flex flex-wrap justify-center sm:justify-start">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? "hover:text-yellow-300 hover:bg-richblack-900 hover:rounded-full hover:px-4 hover:py-1 hover:w-auto"
                      : "border-r border-richblack-900 cursor-pointer  hover:text-yellow-300 hover:bg-richblack-900 transition-all duration-200 hover:rounded-full hover:px-4 hover:py-1 hover:w-auto"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>
            <div className="text-center sm:text-left">
              Made with ❤️ 
              <a 
                href="https://www.linkedin.com/in/rishi-raj0104" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline"
              >
              Rishi
              </a>  © {new Date().getFullYear()} Study4U
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
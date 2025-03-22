import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar */}
        <div className="hidden lg:flex w-full md:w-1/4 lg:w-1/5 h-auto md:h-[calc(100vh-3.5rem)] overflow-auto bg-gray-800 text-white">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* Mobile Sidebar (Overlay Design) */}
      {isSidebarOpen && (
        <div className=" fixed inset-0 z-50 bg-black bg-opacity-50 " onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute left-0 top-0 w-68 h-full bg-white shadow-lg p-4 transition-transform duration-300">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
          </div>
        </div>
      )}

      <button
        className={` fixed left-4 z-50 p-2 text-gray-600 lg:hidden rounded shadow flex items-center 
          ${isSidebarOpen ? "top-2 left-72" : "top-16"}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <AiOutlineUp size={28} /> : <AiOutlineDown size={28} />}
      </button>
        {/* Main Content */}
        <div className="flex-1 h-auto md:h-[calc(100vh-3.5rem)] overflow-auto p-4 md:p-6 mt-14">
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}

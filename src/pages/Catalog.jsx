import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux";
import Error from "./Error";

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            //console.log(res);
            const category_id = 
            res?.data?.allTags?.filter((ct) => ct.name
            .split("/").join("-")
            .split(" ").join("-")
            .toLowerCase() === catalogName)[0]._id;
            //console.log(category_id);
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                //console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                //console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          <div className="box-content bg-yellow-300 px-4 rounded-full">
          <div className="mx-auto flex w-full min-h-[260px] max-w-maxContentTab lg:max-w-maxContent flex-col items-center justify-center gap-4 px-4">
          <p className="text-lg text-richblack-900">
                {`Home / Catalog / `}
                <span className="text-richblack-900">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-4xl text-richblack-700">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-500">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex  text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-richblack-900 bg-richblack-900 text-yellow-300 rounded-full"
                    : "text-richblack-900"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-richblack-900 bg-richblack-900 text-yellow-300 rounded-full"
                    : "text-richblack-900"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
    
        </>
      )
    }
    
    export default Catalog
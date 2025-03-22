import { useSelector } from "react-redux";

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-2xl sm:text-3xl font-medium text-richblack-900 text-center sm:text-left">
        Cart
      </h1>
      <p className="border-b border-b-richblack-900 pb-2 font-semibold text-richblack-900 text-center sm:text-left">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-center sm:items-start gap-y-6 lg:flex-row lg:items-start lg:gap-x-10">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-2xl sm:text-3xl text-richblack-900">
          Your cart is empty
        </p>
      )}
    </div>
  );
}

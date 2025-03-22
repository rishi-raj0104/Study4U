import React from "react"

import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"
import ReviewSlider from "../components/common/ReviewSlider"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-5xl flex-col items-center justify-between gap-6 md:gap-8 bg-richblack-900 text-white overflow-hidden px-4 md:px-8">
      {/* Reviews from Other Learners */}
      <h1 className="text-center text-4xl font-semibold mt-4 md:mt-8">
        Reviews from other learners
      </h1>
      <div className="w-full">
        <ReviewSlider />
      </div>
    </div>
    </div>
  )
}

export default Contact
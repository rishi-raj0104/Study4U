import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-richblack-700 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="bg-yellow-300 py-12 w-11/12 max-w-4xl mx-auto px-4 md:px-8 rounded-xl border border-richblack-900">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
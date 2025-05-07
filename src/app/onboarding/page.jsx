"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo_2 from "@/assets/images/solux_logo.png";
import { useRouter } from "next/navigation";

const Modal = ({ title, description, inputs, onSubmit, step }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, selectedOption);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 px-2 pb-2 flex md:justify-center md:items-center justify-end flex-col">
      <div className="bg-[#FAFAFA] rounded-lg sm:rounded-md pb-8 sm:px-14 w-full sm:max-w-[650px] shadow-lg sm:my-0 mt-auto">
        <div className="flex justify-center mb-4 mt-7">
          <Image
            src={logo_2}
            alt="SolUX Logo"
            className="w-[120px] md:w-[155.69px] object-contain"
          />
        </div>

        <h2 className="text-[20px] md:text-[32px] font-[500] md:font-[600] leading-[100%] md:leading-[40px] mb-6 text-center font-inter px-4">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 px-4 md:px-8">
          {step === 1 ? (
            inputs.map((input, index) => (
              <input
                key={index}
                type="text"
                placeholder={input.placeholder}
                className="w-full px-6 sm:px-6 py-4 sm:py-4 rounded-md h-[58px] bg-[#EAEAEA] text-[#999999] text-[16px] font-[400] leading-[16px] placeholder:text-[#999999] outline-none dark:text-white dark:placeholder:text-gray-400"
              />
            ))
          ) : (
            <div className="space-y-3">
              {inputs.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedOption(index)}
                  className={`w-full px-6 sm:px-6 py-4 sm:py-4 rounded-md h-[58px] text-[16px] font-[400] leading-[16px] transition-colors text-center ${
                    selectedOption === index
                      ? "bg-[#323132] text-white"
                      : "bg-[#EAEAEA] text-[#030103] hover:bg-[#d1d1d1]"
                  }`}
                >
                  {option.placeholder}
                </button>
              ))}
            </div>
          )}
          <button
            className={`w-full mt-3 sm:mt-4 bg-[#030103] dark:bg-[#030103] text-white py-3 sm:py-4 rounded-md h-[58px] font-[700] transition-colors text-[14px] leading-[20px] sm:text-lg hover:bg-opacity-90 ${
              step === 2 && selectedOption === null
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            type="submit"
            disabled={step === 2 && selectedOption === null}
          >
            {step === 1 ? "Continue" : "Done"}
          </button>
        </form>

        <p className="text-[#000000] text-[14px] md:text-[14px] font-[400] md:font-[500] leading-[20px] font-inter text-center mt-6 px-4">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function Onboarding() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [modalStep, setModalStep] = useState(1);

  const handleModalSubmit = (e, selectedOption) => {
    e.preventDefault();
    if (modalStep === 1) {
      setModalStep(2);
    } else {
      setShowModal(false);
      // Here you can handle the selected option
      console.log("Selected option:", selectedOption);
      router.push("/"); // Or wherever you want to redirect after completion
    }
  };

  return (
    <main className="min-h-[100vh] lg:h-screen flex flex-col lg:flex-row justify-between items-center bg-white dark:bg-[#030103]">
      {showModal && (
        <Modal
          title={
            modalStep === 1
              ? "Hey! Welcome to SolUX"
              : "What will you use SolUX for"
          }
          description={
            modalStep === 1
              ? "We will never share your information with anyone else."
              : "This helps us create a better experience."
          }
          inputs={
            modalStep === 1
              ? [
                  { placeholder: "Choose a username" },
                  { placeholder: "Your role" },
                  { placeholder: "Where did you hear about us" },
                ]
              : [
                  { placeholder: "Hackathons" },
                  { placeholder: "Personal" },
                  { placeholder: "Work" },
                ]
          }
          onSubmit={handleModalSubmit}
          onClose={() => setShowModal(false)}
          step={modalStep}
        />
      )}
    </main>
  );
}

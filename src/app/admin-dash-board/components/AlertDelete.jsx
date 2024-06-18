"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const AlertDelete = ({ setShowConfirm, showConfirm, handleDeleteAllArticles }) => {
  // Check Input Is Equal To Delete My Account
  const [checkWord, setCheckWord] = useState("");

  // Disabled Or Not The Input
  const [disable, setDisable] = useState(true);

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.autoFocus = true;
    }, 0);
  }, [inputRef]);

  // If Input Is True Change Disable To False
  useEffect(() => {
    if (checkWord.toLowerCase() == "delete all articles") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [checkWord]);

  // No Scroll When Show Confirm Is True
  useEffect(() => {
    if (showConfirm) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [showConfirm]);

  return (
    <div>
      {/* Over Lay */}
      <div onClick={() => setShowConfirm(false)} className="overLay"></div>
      <div className="max-w-full min-w-[300px] bg-white dark:bg-gray-800 p-5 font-bold text-center rounded fixed top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2">
        <h3 className="capitalize text-xl dark:text-white">
          please write (<span className="normal-case font-bold text-red-600 dark:text-red-500">delete all articles</span>) in this input
        </h3>
        <div className="mt-5 flex items-center  dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white border-2 border-gray-300 rounded-md hover:border-blue-700 px-3 py-2 transition-all duration-200">
          <input
            ref={inputRef}
            onChange={(e) => setCheckWord(e.target.value)}
            type="text"
            className="dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-50 placeholder:font-normal dark:text-white block p-1 rounded  w-full  hover:scale-[1.01]  outline-none  transition-all duration-200"
            autoFocus={true}
            placeholder="delete all articles"
          />
        </div>
        <div className="flex gap-5 justify-center items-center smT0:flex-col mt-5">
          {/* Button Delete The Account */}
          <motion.button
            onClick={handleDeleteAllArticles}
            disabled={disable}
            whileHover={!disable && { scale: 1.1 }}
            className={`block p-2 rounded ${disable && "opacity-55"} bg-red-600 hover:bg-red-700 text-white`}
          >
            Delete
          </motion.button>

          {/* Button Cancle */}
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => setShowConfirm(false)} className="block p-2 rounded bg-[#eee] hover:bg-[#b3b3b3]">
            Cancel
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AlertDelete;

"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UPDATE_USER } from "../../fetchApis/user/updateUser";
import { motion, AnimatePresence } from "framer";
import ButtonLoading from "../../../components/buttonLoading/ButtonLoading";
import { BiShow, BiSolidHide } from "react-icons/bi";

const ChangePassword = ({ userToken }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const alertError = (icon, title, message) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
    });
  };

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

  // Handle Update Password Function
  const handleUpdatePassword = async (passwordL, passwordU) => {
    try {
      setLoading(true);
      const message = await UPDATE_USER(userToken.id, "passwordL", passwordL, "passwordU", passwordU);

      // Check Status Code
      if (message.request.status == 200) {
        alertError("success", "Successful", message.data.message);
      } else {
        alertError("error", "Error", message.response.data.message);
      }

      // Hide Loading And Confirm
      setLoading(false);
      setShowConfirm(false);
    } catch (error) {
      alertError("error", "Server Error", "Some Thing Went Wrong");

      // Hide Loading And Confirm
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {showConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div onClick={() => setShowConfirm(false)} className="overLay max-w-full"></div>
            <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded shadow-xl bg-white dark:bg-gray-800 w-[500px] max-w-[95%]">
              <h2 className="text-xl font-bold capitalize text-center text-white p-2 rounded shadow-xl bg-blue-500">change password</h2>

              <div className="max-w-full ">
                <div className="shadow-xl mt-5 p-2 rounded max-w-full">
                  <label htmlFor="passwordL" className="font-bold text-gray-500 dark:text-[#eee] text-sm">
                    Your Password
                  </label>
                  <div className="mt-1 flex items-center  dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white border-2 border-gray-300 rounded-md hover:border-blue-700 px-3 py-2 transition-all duration-200">
                    <input
                      id="passwordL"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      type={showCurrentPassword ? "text" : "password"}
                      className=" dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white block  p-1 rounded  w-full hover:scale-[1.01]  outline-none  transition-all duration-200"
                      placeholder="Current Password"
                    />

                    <AnimatePresence mode="wait">
                      {showCurrentPassword ? (
                        <motion.div
                          key="hide1"
                          className="ml-2 cursor-pointer"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          onClick={() => setShowCurrentPassword(false)}
                        >
                          <BiShow />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="show1"
                          className="ml-2 cursor-pointer"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          onClick={() => setShowCurrentPassword(true)}
                        >
                          <BiSolidHide />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="shadow-xl mt-5 p-2 rounded">
                  <label htmlFor="passwordU" className="font-bold text-gray-500 dark:text-[#eee] text-sm">
                    New Password
                  </label>
                  <div className="mt-1 flex items-center  dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white border-2 border-gray-300 rounded-md hover:border-blue-700 px-3 py-2 transition-all max-w-full duration-200">
                    <input
                      id="passwordU"
                      onChange={(e) => setNewPassword(e.target.value)}
                      type={showNewPassword ? "text" : "password"}
                      className="dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white block p-1 rounded  w-full  hover:scale-[1.01]  outline-none  transition-all duration-200"
                      placeholder="New Password"
                    />

                    <AnimatePresence mode="wait">
                      {showNewPassword ? (
                        <motion.div
                          key="hide"
                          className="ml-2 cursor-pointer"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          onClick={() => setShowNewPassword(false)}
                        >
                          <BiShow />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="show"
                          className="ml-2 cursor-pointer"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          onClick={() => setShowNewPassword(true)}
                        >
                          <BiSolidHide />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-2 mt-5">
                  <motion.button
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 1 }}
                    onClick={() => {
                      handleUpdatePassword(currentPassword, newPassword);
                    }}
                    className="font-bold flex justify-center items-center p-2 bg-blue-500 w-[300px] max-w-full mx-auto rounded shadow capitalize text-white"
                  >
                    {loading ? <ButtonLoading /> : "save"}
                  </motion.button>
                  <motion.button
                    onClick={() => setShowConfirm(false)}
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 1 }}
                    className="font-bold block p-2 bg-gray-400 w-[300px] max-w-full mx-auto rounded shadow capitalize"
                  >
                    cancle
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-white font-bold capitalize block bg-blue-600 p-2 rounded shadow border-2 border-blue-600 w-fit mx-auto hover:scale-105 hover:border-white transition-all duration-200"
      >
        change password
      </button>
    </div>
  );
};

export default ChangePassword;

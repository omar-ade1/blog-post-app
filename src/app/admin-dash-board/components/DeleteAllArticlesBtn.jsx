"use client";
import React, { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { AnimatePresence, motion } from "framer";
import { DELETE_ALL_ARTICLES } from "../../fetchApis/articles/deleteAllArticles";
import AlertDelete from "./AlertDelete";
import Swal from "sweetalert2";
import { Toast } from "../../../components/toast";

const DeleteAllArticlesBtn = ({ setRefresh, refresh }) => {
  const [showConfirm, setShowConfirm] = useState(false);



  // Alert To Confirm Delete
  const alertConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete Account",
      customClass: {
        popup: "dark:bg-gray-800",
        title: "dark:text-white",
        htmlContainer: "dark:!text-[#eee]",
        input: "dark:!text-[#eee]",
        inputLabel : "dark:!text-[#eee]",
        icon: "dark:!border-yellow-500 dark:!text-yellow-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Show Last Confirm
        setShowConfirm(true);
      }
    });
  };

  const handleDeleteAllArticles = async () => {
    try {
      const message = await DELETE_ALL_ARTICLES();

      // If Resoponse Is Ok
      if (message.request.status == 200) {
        // Alert Successful
        Toast.fire({
          icon: "success",
          title: message.data.message,
        });

        // If Not Ok
      } else {
        // Alert Error
        Toast.fire({
          icon: "error",
          title: message.response.data.message,
        });
      }

      setRefresh(!refresh);
    } catch (error) {
      // Alert Error
      Toast.fire({
        icon: "error",
        title: "Some Thing Went Wrong",
      });
    }
  };
  return (
    <div>
      <motion.button
        onClick={alertConfirm}
        whileHover={{ scale: 1.1, backgroundColor: "red" }}
        whileTap={{ scale: 1 }}
        className="flex justify-center items-center gap-2 text-xl font-bold mx-auto w-fit mt-10 bg-red-600 p-2 rounded text-white"
      >
        <IoIosWarning />
        Delete All Article
      </motion.button>
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="h-screen inset-0 fixed"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <AlertDelete setShowConfirm={setShowConfirm} showConfirm={showConfirm} handleDeleteAllArticles={handleDeleteAllArticles} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeleteAllArticlesBtn;

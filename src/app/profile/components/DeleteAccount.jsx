"use client";
import React, { useState } from "react";
import { DELETE_USER } from "../../fetchApis/user/deleteUser";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import AlertDelete from "./AlertDelete";
import { AnimatePresence, motion } from "framer";
import LoadingIcon from "../../../components/loading/Loading";
import { Toast } from "../../../components/toast";

const DeleteAccount = ({ id }) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);



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
        icon: "dark:!border-yellow-500 dark:!text-yellow-500",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Show Last Confirm
        setShowConfirm(true);
      }
    });
  };

  // Handle Delete Function
  const handleDelete = () => {
    setLoading(true);
    DELETE_USER(id)
      .then((response) => {
        // If Resoponse Is Ok
        if (response.request.status == 200) {
          // Alert Successful
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          router.push("/login");
          router.refresh();

          // If Not Ok
        } else {
          // Alert Error
          Toast.fire({
            icon: "error",
            title: response.response.data.message,
          });
        }
        setLoading(false);
      })

      // While Error
      .catch((error) => {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "SomeThing Went Wrong",
        });
        setLoading(false);
      });
  };

  return (
    <div className="w-full">
      {loading && (
        <div>
          <LoadingIcon />
        </div>
      )}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          alertConfirm();
        }}
        className="bg-red-800 text-center  text-xl font-bold py-2 px-5 rounded text-gray-300 w-fit mx-auto mt-4 cursor-pointer"
      >
        Delete Account
      </motion.div>
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="h-screen inset-0 fixed"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <AlertDelete setShowConfirm={setShowConfirm} handleDelete={handleDelete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeleteAccount;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LOG_OUT_USER } from "../../fetchApis/auth/logOut";
import Swal from "sweetalert2";
import LoadingIcon from "../../../components/loading/Loading";
import { motion } from "framer";
import { Toast } from "../../../components/toast";

const LogOutBtn = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Function Handle Log Out
  const logOutHandler = async () => {
    setLoading(true);
    const message = await LOG_OUT_USER();

    // Fire A Alert With Message From LOG_OUT_USER()
    Toast.fire({
      icon: "success",
      title: message,
    });
    // Refresh Components After Function
    router.push("/login");
    router.refresh();
    setLoading(false);
  };

  const alertConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log Out",
      customClass: {
        popup: "dark:bg-gray-800",
        title: "dark:text-white",
        htmlContainer: "dark:!text-[#eee]",
        input: "dark:!text-[#eee]",
        inputLabel: "dark:!text-[#eee]",
        icon: "dark:!border-yellow-500 dark:!text-yellow-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOutHandler();
      }
    });
  };

  return (
    <div className="w-full">
      {loading && (
        <div>
          <LoadingIcon />
        </div>
      )}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={alertConfirm}
        className="block mt-5 w-full text-center font-bold bg-red-600 text-white py-2 px-5 text-xl capitalize mx-auto rounded"
      >
        log out
      </motion.button>
    </div>
  );
};

export default LogOutBtn;

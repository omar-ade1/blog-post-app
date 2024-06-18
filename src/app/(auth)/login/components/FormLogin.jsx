"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { z } from "zod";
import { LOGIN_USER } from "../../../fetchApis/auth/loginUser";
import { useRouter } from "next/navigation";
import ButtonLoading from "../../../../components/buttonLoading/ButtonLoading";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { AnimatePresence, motion } from "framer";
import { Toast } from "../../../../components/toast";

const FormLogin = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();


  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Create Schema For Email And Password
    const schemaEmail = z.string().min(5).email();
    const schemaPassword = z.string().min(6, "Password Must Be 6 Letters Or Upper");

    // Checking
    const valdationEmail = schemaEmail.safeParse(email);
    const valdationPassword = schemaPassword.safeParse(password);

    // If Email False
    if (!valdationEmail.success) {
      // Return A Alert Error
      return Toast.fire({
        icon: "error",
        title: valdationEmail.error.issues[0].message,
      });
    }
    // If Password False
    if (!valdationPassword.success) {
      // Return A Alert Error
      return Toast.fire({
        icon: "error",
        title: valdationPassword.error.issues[0].message,
      });
    }

    // Make A Request With LOGIN_USER() And Refresh The Router And Return A Alert
    const message = await LOGIN_USER(email, password);

    // Check Status Code
    if (message.request.status == 200) {
      router.push("/");
      router.refresh();
      Toast.fire({
        icon: "success",
        title: message.data.message,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: message.response.data.message,
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={(e) => handleLogin(e)} className="space-y-6  " action="#" method="POST">
      <div>
        <label htmlFor="email" className="block dark:text-[#eee] text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autocomplete="email"
            required
            className="appearance-none dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter your email address"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block dark:text-[#eee] text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 flex items-center  dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white border border-gray-300 rounded-md  px-3 py-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="current-password"
            required
            className="appearance-none flex-1 relative  block w-full  dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter your password"
          />

          <AnimatePresence mode="wait">
            {showPassword ? (
              <motion.div
                key="hide"
                className="ml-2 cursor-pointer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => setShowPassword(false)}
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
                onClick={() => setShowPassword(true)}
              >
                <BiSolidHide />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <button
          disabled={loading}
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? <ButtonLoading /> : <p>Sign in</p>}
        </button>
      </div>
    </form>
  );
};

export default FormLogin;

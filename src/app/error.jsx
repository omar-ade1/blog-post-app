"use client";

import Image from "next/image";
import errorPageImage from "../../public/errorPage.svg";
import { motion } from "framer";

export default function Error({ error, reset }) {
  return (
    <div className="dark:bg-gray-900 trnasitionDarkMode">
      <div className="container fix-height flex flex-col items-center justify-center">
        <Image src={errorPageImage} alt="error" />
        <h2 className="text-4xl font-bold text-blue-700 text-center">Something went wrong!</h2>
        <h3 className="mt-5 capitalize dark:text-white text-center">
          error message : <span className="text-red-600 font-bold">{error.message}</span>
        </h3>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "blue" }}
          whileTap={{ scale: 1 }}
          className="text-xl font-bold bg-blue-500 p-2 rounded mt-5 text-white"
          onClick={() => reset()}
        >
          Try again
        </motion.button>
      </div>
    </div>
  );
}

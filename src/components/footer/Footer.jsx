import Link from "next/link";
import React from "react";
import { BiHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiSquareInfo } from "react-icons/ci";
import { FaBloggerB } from "react-icons/fa6";
import { GrArticle } from "react-icons/gr";
import { FaCode } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="pt-5 text-white bg-[#415262] dark:bg-gray-800">
      <div className="container">
        <div className="flex justify-between items-center smT0:flex-col smT0:gap-3">
          <div className="logo">
            <Link className="flex items-center gap-[1px] text-3xl  font-bold capitalize" href="/">
              blog <FaBloggerB className="text-blue-700" /> post
            </Link>
          </div>
          <div className="links flex xsm:flex-col xsm:gap-2 gap-4">
            <Link
              className="capitalize font-semibold flex items-center border border-transparent rounded p-1 hover:border hover:border-white transition-all duration-200"
              href="/"
            >
              <BiHome /> home
            </Link>
            <Link
              className="capitalize font-semibold flex items-center border border-transparent rounded p-1 hover:border hover:border-white transition-all duration-200"
              href="/articles"
            >
              <GrArticle /> articles
            </Link>
            <Link
              className="capitalize font-semibold flex items-center border border-transparent rounded p-1 hover:border hover:border-white transition-all duration-200"
              href="/profile"
            >
              <CgProfile /> profile
            </Link>
            <Link
              className="capitalize font-semibold flex items-center border border-transparent rounded p-1 hover:border hover:border-white transition-all duration-200"
              href="/#about"
            >
              <CiSquareInfo /> about
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-t-[#6f6f6f] mt-2 flex justify-center p-2 capitalize font-bold items-center gap-2">
        <p>by</p>{" "}
        <span className="text-green-500 flex items-center gap-1">
          <span>omar</span>
          <span>Adel</span>
          <FaCode /> 
        </span>
      </div>
    </footer>
  );
};

export default Footer;

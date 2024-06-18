"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMenuSharp, IoCloseCircle } from "react-icons/io5";
import "../header.css";
import OverLay from "../../overLay/OverLay";
import { usePathname, useParams } from "next/navigation";
import { CiDark, CiLight } from "react-icons/ci";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Nav = ({ userToken }) => {
  // State For Handle Open Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const articleId = useParams();

  // Enable Dark Mode If The User Used Dark Mode
  useEffect(() => {
    if (!localStorage.getItem("darkMode")) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkMode(true);
        localStorage.setItem("darkMode", true);
        document.documentElement.classList.add("dark");
      } else {
        setDarkMode(false);
        localStorage.setItem("darkMode", false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Handle Add Class Dark To Html Element
  useEffect(() => {
    if (!localStorage.getItem("darkMode")) {
      setDarkMode(false);
      localStorage.setItem("darkMode", false);
      document.documentElement.classList.remove("dark");
    } else {
      if (localStorage.getItem("darkMode") == "true") {
        document.documentElement.classList.add("dark");
        setDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setDarkMode(false);
      }
    }
  }, []);

  const handleDarkMode = () => {
    setDarkMode(true);
    localStorage.setItem("darkMode", true);
    document.documentElement.classList.add("dark");
  };
  const handleLightMode = () => {
    setDarkMode(false);
    localStorage.setItem("darkMode", false);
    document.documentElement.classList.remove("dark");
  };

  // Different Background For The Route That The User Is Currently In
  const [url, setUrl] = useState("/");
  const currentUrl = usePathname();
  useEffect(() => {
    setUrl(currentUrl);
  }, [currentUrl]);


  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Function To Open And Close Menu
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  return (
    <>
      {menuOpen && <OverLay handleMenuOpen={handleMenuOpen} />}
      <div>
        {/* Start Nav */}
        <nav
          className={`flex smT0:block z-20 smT0:border-b-4 smT0:dark:bg-gray-700 smT0:dark:border-b-gray-500 smT0:border-b-[#ddd]  smT0:absolute smT0:top-full smT0:bg-gray-100 smT0:w-full smT0:left-0 ${
            menuOpen ? "menu-open-clip" : "menu-close-clip"
          } transition-all duration-300`}
        >
          {/* Start Nav Links */}
          <ul className={`nav-links flex gap-2  smT0:block smT0:divide-y-2 dark:smT0:divide-gray-400`}>
            <li>
              <Link onClick={() => setMenuOpen(false)} className={`header-nav-link ${url === "/" ? "bg-blue-500 text-white" : ""}`} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenuOpen(false)}
                className={`header-nav-link ${url === "/articles" || url === `/articles/${articleId.id}` ? "bg-blue-500 text-white" : ""}`}
                href="/articles"
              >
                Articles
              </Link>
            </li>
            <div className="smT0:block flex justify-center items-center">
              {/* Show When User Is Admin */}
              {userToken && userToken.isAdmin && (
                <li>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    className={`header-nav-link ${url === "/admin-dash-board" ? "bg-blue-500 text-white" : ""}`}
                    href="/admin-dash-board"
                  >
                    Admin
                  </Link>
                </li>
              )}
              <div className={`text-yellow-500 ml-5 smT0:hidden`}>
                {darkMode ? (
                  <MdDarkMode onClick={() => handleLightMode()} className="text-4xl hover:-rotate-12 transition-all duration-200 cursor-pointer" />
                ) : (
                  <MdLightMode onClick={() => handleDarkMode()} className="text-4xl hover:rotate-45 transition-all duration-200 cursor-pointer" />
                )}
              </div>
            </div>
          </ul>
          {/* End Nav Links */}
          <hr className="border-t-2 dark:smT0:border-gray-400" />

          {/* Show Auth Buttons In Small Devices Under Nav Links */}
          {userToken ? (
            <Link
              onClick={() => setMenuOpen(false)}
              title="profile"
              href="/profile"
              className={`smT0:flex hidden justify-center gap-3 items-center py-1 ${
                url === "/profile" ? "bg-blue-500 text-white" : ""
              } px-2 text-gray-600 hover:text-black hover:bg-gray-300 transition-colors duration-200 `}
            >
              <h3 className="w-[40px] h-[40px] p-1 flex justify-center items-center text-xl font-bold capitalize  border-2 border-black border-double rounded-full bg-blue-700 text-white hover:bg-blue-900">
                {userToken.userName[0]}
              </h3>
              <p className="capitalize text-blue-700 font-bold">profile</p>
            </Link>
          ) : (
            <div className=" smT0:grid hidden my-4 gap-2">
              <Link
                onClick={() => setMenuOpen(false)}
                className="header-auth-btns w-[300px] text-center mx-auto bg-blue-700 text-white hover:bg-blue-900 "
                href="/login"
              >
                login
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                className="header-auth-btns w-[300px] text-center mx-auto bg-white border border-black text-black hover:bg-gray-500"
                href="/sign-up"
              >
                sign up
              </Link>
            </div>
          )}
          {/* End Auth Buttons */}
        </nav>
        {/* End Nav */}

        {/* Show Close Icon Or Menu Icon */}
        <div className="smT0:flex hidden  justify-center items-center">
          {menuOpen ? (
            <IoCloseCircle onClick={handleMenuOpen} className="text-4xl dark:text-red-700 smT0:block hidden cursor-pointer transitionDarkMode" />
          ) : (
            <IoMenuSharp onClick={handleMenuOpen} className="text-4xl dark:text-white smT0:block hidden cursor-pointer transitionDarkMode" />
          )}
          <div className={`text-yellow-500`}>
            {darkMode ? (
              <MdDarkMode onClick={() => handleLightMode()} className="text-4xl hover:-rotate-12 transition-all duration-200 cursor-pointer" />
            ) : (
              <MdLightMode onClick={() => handleDarkMode()} className="text-4xl hover:rotate-45 transition-all duration-200 cursor-pointer" />
            )}
          </div>
        </div>
        {/* End */}
      </div>
    </>
  );
};

export default Nav;

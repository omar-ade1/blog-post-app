import Link from "next/link";
import React from "react";
import { FaBloggerB } from "react-icons/fa";
import "./header.css";
import Nav from "./components/Nav";
import { cookies } from "next/headers";
import { checking } from "../../utils/checkToken";
const Header = async () => {
  const cookie = cookies().get("jwtToken")?.value;
  const userToken = await checking(cookie);

  return (
    <header className="py-2  dark:bg-gray-800 bg-gray-100 relative z-10 select-none h-[60px] shadow-xl transitionDarkMode">
      {/* container */}
      <div className="container flex smT0:justify-between justify-around items-center gap-10">
        {/* Start Logo */}
        <div className="logo">
          <Link className="flex dark:text-white items-center gap-[1px] text-3xl  font-bold capitalize" href="/">
            blog <FaBloggerB className="text-blue-700" /> post
          </Link>
        </div>
        {/* End Logo */}

        {/* Links And Menu */}
        <Nav userToken={userToken} />
        {/* End Links And Menu */}

        {/* Auth Button In Large Devices */}

        {userToken ? (
          <div className="smT0:hidden flex gap-3 items-center">
            <Link
              title="profile"
              href="/profile"
              className=" w-[40px] h-[40px] p-1 flex justify-center items-center text-xl font-bold capitalize  border-2 border-black border-double rounded-full bg-blue-700 text-white hover:bg-blue-900"
            >
              {userToken.userName[0]}
            </Link>
          </div>
        ) : (
          <div className="smT0:hidden flex gap-2">
            <Link className="header-auth-btns bg-blue-700 text-white hover:bg-blue-900 " href="/login">
              login
            </Link>
            <Link className="header-auth-btns bg-white border border-black text-black hover:bg-gray-500" href="/sign-up">
              sign up
            </Link>
          </div>
        )}

        {/* End */}
      </div>
    </header>
  );
};

export default Header;

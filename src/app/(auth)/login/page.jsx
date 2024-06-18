import Image from "next/image";
import React from "react";
import loginImage from "../../../../public/login.svg";
import FormLogin from "./components/FormLogin";
import TextLogin from "./components/TextLogin";
import { cookies } from "next/headers";
import { checking } from "../../../utils/checkToken";
import { redirect } from "next/navigation";

const Login = async() => {

  // Protect Route If Token Is Founded
  const cookie = cookies().get("jwtToken")?.value;
  const userToken = await checking(cookie);

  // To Redirect To Home Page If No Token
  if (userToken) {
    redirect("/profile");
  }


  return (
    <div className="bg-[#eee] dark:bg-gray-900 transitionDarkMode">
      <div className="container fix-height flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex max-w-full items-center  mdT0:flex-col justify-around ">
          <div>
            <Image className="w-[600px] mdT0:w-[300px] max-w-full mx-auto" src={loginImage} alt="" />
          </div>
          <div className="w-[600px] max-w-full">
            <TextLogin />

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white dark:bg-gray-800 transitionDarkMode rounded-xl py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
                <FormLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

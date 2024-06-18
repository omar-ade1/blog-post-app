import Image from "next/image";
import React from "react";
import signUpImage from "../../../../public/sign-up.svg";
import FormSignUp from "./components/FormSignUp";
import TextSignUp from "./components/TextSignUp";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checking } from "../../../utils/checkToken";

const SignUp = async () => {

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
            <Image className="w-[600px] mdT0:w-[300px] max-w-full mx-auto" src={signUpImage} alt="" />
          </div>

           <div className="w-[600px] max-w-full">
            <TextSignUp />

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white dark:bg-gray-800 transitionDarkMode rounded-xl py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <FormSignUp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

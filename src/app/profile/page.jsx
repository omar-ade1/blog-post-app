import { cookies } from "next/headers";
import React from "react";
import { checking } from "../../utils/checkToken";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import Input from "./components/Input";
import LogOutBtn from "./components/LogOutBtn";
import DeleteAcount from "./components/DeleteAccount";
import ChangePassword from "./components/ChangePassword";
import { redirect } from "next/navigation";

const Profile = async () => {
  const cookie = cookies().get("jwtToken")?.value;
  const userToken = await checking(cookie);

  // To Redirect To Home Page If No Token
  if (!userToken) {
    redirect("/");
  }

  return (
    <div className="fix-height py-[50px] dark:bg-gray-900 transitionDarkMode">
      <div className="name-logo pt-10">
        <div className="container ">
          {userToken ? (
            <>
              <div className="flex justify-around xxsm:flex-col py-[20px] items-center gap-5 shadow-xl mb-10 border rounded bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center gap-5 shadow-xl rounded p-2 bg-blue-50 dark:bg-slate-600">
                  <div className="w-[70px] h-[70px] p-1 flex justify-center items-center text-xl font-bold capitalize  border-2 border-black border-double rounded-full bg-blue-700 text-white hover:bg-blue-900">
                    {userToken.userName[0]}
                  </div>
                  <h2 className="font-bold text-xl dark:text-white">{userToken.userName}</h2>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <LogOutBtn />
                  <DeleteAcount id={userToken.id} />
                </div>
              </div>

              <hr className="border-t-4 mt-2 shadow dark:border-gray-500" />
              <hr className="border-t-4 mt-2 shadow dark:border-gray-500" />

              <div className="info-user bg-[#f8f8ff] dark:bg-gray-600 p-5 rounded shadow-xl space-y-4 w-fit max-w-full mx-auto mt-5">
                <div>
                  <h2 className="text-2xl bg-white dark:text-white dark:bg-gray-500 p-2 rounded shadow-xl font-bold capitalize text-center text-gray-500">user informations</h2>
                </div>

                <Input userToken={userToken} labelName="email" inputType="email" enableEdit={false}>
                  <MdEmail />
                </Input>

                <Input userToken={userToken} labelName="userName" inputType="text" enableEdit={true}>
                  <FaUserAlt />
                </Input>

                <div className="max-w-full">
                  <ChangePassword userToken={userToken} />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

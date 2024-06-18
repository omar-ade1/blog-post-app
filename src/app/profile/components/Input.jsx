"use client";

import React, { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { UPDATE_USER } from "../../fetchApis/user/updateUser";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Toast } from "../../../components/toast";


const Input = ({ userToken, labelName, children, inputType, enableEdit }) => {
  // To Disable Input Or Not
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  // This Is A State To Set Name Of Input To Send It To FunctionUPDATE_USER
  const [nameInput, setNameInput] = useState({
    inputName: labelName,
  });

  // This Is A Value Of Updated Data
  const [valueUpdate, setValueUpdate] = useState(userToken[labelName]);

  // For Input Filed
  const inputRef = useRef();

  // Handle Edit Button
  const editBtn = () => {
    if (disabled) {
      setDisabled(false);
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
  };

  // Handle Save Button
  const handleSaveBtn = () => {
    // Check Is User Update Data Or Not
    if (valueUpdate == userToken[labelName]) {
      setDisabled(true);
      return (
        // Alert Error
        Toast.fire({
          icon: "error",
          title: "No Updates Made",
        })
      );
    }

    if (!disabled) {
      UPDATE_USER(userToken.id, nameInput.inputName, valueUpdate)
        .then((response) => {
          // If Resoponse Is Ok
          if (response.request.status == 200) {
            // Alert Successful
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
            setDisabled(true);
            router.refresh();

            // If Not Ok
          } else {
            // Alert Error
            Toast.fire({
              icon: "error",
              title: response.response.data.message,
            });
            setTimeout(() => {
              inputRef.current.focus();
            }, 0);
          }
        })

        // While Error
        .catch((error) => {
          console.log(error);
          Toast.fire({
            icon: "error",
            title: "SomeThing Went Wrong",
          });
        });
    }
  };

  // Handle Cancle Button
  const handleCancleBtn = () => {
    setDisabled(true);
    inputRef.current.value = userToken[labelName];
    setValueUpdate(userToken[labelName]);
  };

  return (
    <div className={`${labelName} shadow-xl border dark:border-gray-600 p-3 rounded`}>
      <label className="flex text-xl items-center gap-2 font-bold mb-2 capitalize dark:text-white" htmlFor={labelName}>
        {labelName} {children}
      </label>
      <div className="flex items-center smT0:flex-col gap-5">
        <input
          ref={inputRef}
          disabled={disabled}
          onChange={(e) => setValueUpdate(e.target.value)}
          id={labelName}
          className="border-2 border-gray-500 rounded block p-2  w-[300px] max-w-full "
          type={inputType}
          defaultValue={userToken[labelName]}
        />

        {enableEdit && (
          <div>
            {disabled ? (
              <div
                className={`flex justify-center items-center min-w-[30px] min-h-[30px] cursor-pointer p-1 dark:text-white dark:hover:text-black hover:bg-gray-300
                rounded-full`}
                onClick={editBtn}
              >
                <FaEdit className="text-xl" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MdCancel className="text-xl cursor-pointer dark:text-red-700" onClick={handleCancleBtn} />
                <button onClick={handleSaveBtn} className="bg-blue-600 rounded font-bold text-white p-1 hover:bg-blue-700">
                  save
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

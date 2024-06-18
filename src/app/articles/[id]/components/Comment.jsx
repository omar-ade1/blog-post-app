"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DELETE_COMMENT } from "../../../fetchApis/comments/deleteComment";
import Swal from "sweetalert2";
import { UPDATE_COMMENT } from "../../../fetchApis/comments/updateComment";
import { BiStar } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { Toast } from "../../../../components/toast";

const Comment = ({ commentData, idUserFromToken, isAdmin, reload, setReload }) => {
  // This Is For Hide Or Show More Text In Comment
  const [readMore, setReadMore] = useState(false);

  // This Is For Hide Or Show Read More Button
  const [showReadMore, setShowReadMore] = useState(false);

  // This Is For Storage New Updated Comment In State
  const [updateComment, setUpdatedComment] = useState(commentData.text);

  // This Is For Span That Contain The Comment Text
  const commentTextSpanRef = useRef();

  // fix

 

  // fix

  // !
  // ? START UPDATED COMMENT FUNCTIONS
  // This Is Alert To Type Text Of Updated Comment In It
  const updateCommentAlert = (id) => {
    (async () => {
      // Default Value
      const inputValue = updateComment;
      const { value: newComment } = await Swal.fire({
        title: "Update Your Comment",
        input: "textarea",
        inputLabel: "new comment",
        inputValue,
        showCancelButton: true,
        showCloseButton: true,
        customClass: {
          popup: "dark:bg-gray-800",
          title: "dark:text-white",
          htmlContainer: "dark:!text-[#eee]",
          input: "dark:!text-[#eee]",
          inputLabel : "dark:!text-[#eee]",
          icon: "dark:!border-yellow-500 dark:!text-yellow-500",
        },
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });
      if (newComment) {
        setUpdatedComment(newComment);
        handleUpdateComment(newComment, id);
      }
    })();
  };

  // Updated Comment Handler
  const handleUpdateComment = async (newComment, id) => {
    const message = await UPDATE_COMMENT(newComment, id);
    // Check If Successful Or Not
    if (message.request.status == 200) {
      Toast.fire({
        icon: "success",
        title: message.data.message,
      });
      setReload(!reload);
    } else {
      Toast.fire({
        icon: "error",
        title: message.response.data.message,
      });
    }
  };
  // ? END UPDATED COMMENT FUNCTIONS
  // !

  /*
  *****************************************************************
  todo : Just a break between the text
  *****************************************************************
  */

  // !
  // ? START DELETE COMMENT FUNCTIONS
  // This Is Alert Confirm To Delete Comment
  const confirmAlert = (id) => {
    Swal.fire({
      title: "Are you sure? Delete Comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "dark:bg-gray-800",
        title: "dark:text-white",
        htmlContainer: "dark:!text-[#eee]",
        input: "dark:!text-[#eee]",
        inputLabel : "dark:!text-[#eee]",
        icon: "dark:!border-yellow-500 dark:!text-yellow-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Run Delete Comment Function
        handleDeleteComment(id);
      }
    });
  };

  const handleDeleteComment = async (id) => {
    const message = await DELETE_COMMENT(id);
    // Check If Successful Or Not
    if (message.request.status == 200) {
      Toast.fire({
        icon: "success",
        title: message.data.message,
      });
      setReload(!reload);
    } else {
      Toast.fire({
        icon: "error",
        title: message.response.data.message,
      });
    }
  };
  // ? END DELETE COMMENT FUNCTIONS
  // !

  useEffect(() => {
    if (commentTextSpanRef.current.innerHTML.length > 152) {
      setShowReadMore(true);
    } else {
      setShowReadMore(false);
    }
  }, [commentTextSpanRef]);

  return (
    <div className="mt-5 border  border-blue-200  rounded p-2 shadow hover:scale-[1.01] hover:shadow-xl hover:border-blue-600 transition-all duration-200">
      <div className="relative">
        <h2 className="font-bold dark:text-white">{commentData.user.userName}</h2>

        {/* Show The Delete Button For All Comments If The User Is An Admin */}
        {idUserFromToken == commentData.userId || isAdmin ? (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <MdDelete onClick={() => confirmAlert(commentData.id)} className="cursor-pointer text-red-600 text-xl" />
            {idUserFromToken == commentData.userId && (
              <FaEdit onClick={() => updateCommentAlert(commentData.id)} className="cursor-pointer text-blue-600 text-xl" />
            )}
          </div>
        ) : (
          ""
        )}

        {/* Show An Icon If The User Wrote This Comment */}
        {idUserFromToken == commentData.userId && (
          <h3 className="font-bold text-xs bg-blue-300 w-fit p-1 rounded flex justify-center items-center mt-2">
            <FaUser /> You
          </h3>
        )}

        {/* Show Icon If User Is Admin */}
        {commentData.user.isAdmin && (
          <h3 title="this user is an admin" className="font-bold text-xs bg-blue-300 w-fit p-1 rounded flex justify-center items-center mt-2">
            <BiStar /> Admin
          </h3>
        )}
      </div>

      <hr className="border-t-2 mt-2 dark:border-gray-500" />
      <hr className="border-t-2 mt-2 dark:border-gray-500" />

      <p className={`flex  relative mt-2 ${readMore || !showReadMore ? "h-full" : "h-[78px]"}  overflow-hidden`}>
        <span className="block h-full w-full break-all text-wrap dark:text-[#ebebeb]" ref={commentTextSpanRef}>
          {commentData.text}
        </span>

        {showReadMore && (
          <button onClick={() => setReadMore(!readMore)} className="p-2 block text-xs capitalize text-violet-900 dark:text-violet-300 font-bold">
            {readMore ? "read less" : "read more"}
          </button>
        )}
      </p>
    </div>
  );
};

export default Comment;

"use client";
import { motion } from "framer";
import React, { useState } from "react";
import { ADD_COMMENT } from "../../../fetchApis/comments/addNewComment";
import { Toast } from "../../../../components/toast";

const FormComment = ({ articleId, reload, setReload }) => {
  const [textComment, setTextComment] = useState("");


  const handleAddComment = async (e) => {
    e.preventDefault();

    // Fetch Api
    const message = await ADD_COMMENT(textComment, articleId);

    // Check If Successful Or Not
    if (message.request.status == 200) {
      Toast.fire({
        icon: "success",
        title: message.data.message,
      });
      setTextComment("")
      setReload(!reload);
    } else {
      Toast.fire({
        icon: "error",
        title: message.response.data.message,
      });
    }
  };

  return (
    <form onSubmit={(e) => handleAddComment(e)} className="mt-5 w-full flex gap-5">
      <input
        value={textComment}
        onChange={(e) => setTextComment(e.target.value)}
        type="text"
        className="w-full block p-2  rounded border-2 border-blue-300 dark:border-gray-500 dark:text-white dark:bg-gray-600 focus:border-blue-500 focus:shadow-xl outline-none transition duration-300 "
        placeholder="Add Comment"
      />
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#003aba" }}
        whileTap={{ scale: 0.9 }}
        className="block p-2 bg-blue-600 rounded  font-bold text-white"
        type="submit"
        disabled={!textComment.length}
      >
        Add
      </motion.button>
    </form>
  );
};

export default FormComment;

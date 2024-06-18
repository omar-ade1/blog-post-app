"use client";

import React, { useState } from "react";
import { ADD_ARTCILE } from "../../../fetchApis/articles/addArticle";
import ButtonLoading from "../../../../components/buttonLoading/ButtonLoading";
import { Toast } from "../../../../components/toast";

const FormAddArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddArticle = async (e) => {
    setLoading(true);
    e.preventDefault();

    const message = await ADD_ARTCILE(title, description);

    // Check Status Code
    if (message.request.status == 200) {
      Toast.fire({
        icon: "success",
        title: message.data.message,
      });
      setTitle("");
      setDescription("");
    } else {
      Toast.fire({
        icon: "error",
        title: message.response.data.message,
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => handleAddArticle(e)}
      className="space-y-6 w-[500px] p-3 mx-auto max-w-full bg-[#eee] dark:bg-gray-700 rounded transitionDarkMode"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-[#eee]">
          Title
        </label>
        <div className="mt-1">
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="appearance-none rounded-md dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
            placeholder="Enter Title"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-[#eee]">
          Description
        </label>
        <div className="mt-1">
          <textarea
            rows={5}
            id="description"
            name="description"
            type="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="appearance-none rounded-md dark:bg-gray-600 dark:border-gray-600 dark:placeholder:text-gray-100 dark:text-white relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
            placeholder="Enter Description"
          />
        </div>
      </div>

      <div>
        <button
          disabled={loading}
          type="submit"
          className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? (
            <>
              <ButtonLoading />
            </>
          ) : (
            <p>Add</p>
          )}
        </button>
      </div>
    </form>
  );
};

export default FormAddArticle;

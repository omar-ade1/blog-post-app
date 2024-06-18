import React from "react";
import FormAddArticle from "./components/FormAddArticle";

const AddArticle = () => {
  return (
    <div className="py-[50px]">
      <h2 className="text-2xl font-bold text-center m-5 max-w-full dark:text-white">Add Article</h2>
      <FormAddArticle />
    </div>
  );
};

export default AddArticle;

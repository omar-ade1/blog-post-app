import Link from "next/link";
import React from "react";

const Article = ({ title, description, id }) => {
  return (
    <div className="shadow-xl odd:bg-blue-50 dark:odd:bg-gray-600 dark:even:bg-gray-700 even:bg-gray-50 border dark:border-gray-500 p-2 rounded hover:scale-105 hover:border-blue-600 transition-all duration-200">
      <h3 className="line-clamp-1 capitalize text-xl font-bold dark:text-white">{title}</h3>
      <p className="line-clamp-1 mt-4 dark:text-slate-400 font-semibold">{description}</p>
      <Link
        className="font-bold bg-blue-600 p-2 rounded block w-fit mt-4 text-white  hover:bg-blue-900 transition-all duration-200"
        href={`/articles/${id}`}
      >
        Read More
      </Link>
    </div>
  );
};

export default Article;

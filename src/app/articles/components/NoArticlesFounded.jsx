import Image from "next/image";
import React from "react";
import articleNotFound from "../../../../public/article-not-found.svg";

const NoArticlesFounded = () => {
  return (
    <div className="flex z-0 justify-center items-center mt-5 flex-col left-0">
      <h2 className="text-4xl text-center opacity-70 smT0:text-2xl font-bold text-gray-600">No Articles Founded</h2>
      <Image className="block w-[400px] max-w-full" src={articleNotFound} alt="not found"></Image>
    </div>
  );
};

export default NoArticlesFounded;

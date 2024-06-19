import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSingleArticle = () => {
  return (
    <SkeletonTheme  baseColor="#eee" highlightColor="#d6d6d6">
      <div className="container fix-height flex pt-10 items-center flex-col ">
        <div className="box border-2 rounded p-3 w-[clamp(300px,100%,700px)]">
          <Skeleton containerClassName="block" className="p-3" />
          <hr className="border-t-2 mt-2" />
          <hr className="border-t-2 mt-2" />
          <Skeleton containerClassName="block mt-5" count={10} className="text-lg" />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoadingSingleArticle;

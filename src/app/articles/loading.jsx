import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingArticle = () => {

  return ( 
    <SkeletonTheme  baseColor={`#eee`} highlightColor={`#929292`}>
      <div className="container fix-height flex items-center flex-col pt-10">
        <Skeleton containerClassName="block max-w-full" style={{ width: "600px", maxWidth: "100%" }} height={40} className="max-w-full" />
        <div className="articles w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-5 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => {
            return (
              <div key={i} className="block p-3 min-h-[130px] border-4 rounded-lg border-gray-400">
                <Skeleton containerClassName="block" style={{ padding: "5px" }} />
                <Skeleton containerClassName="block mt-5" style={{ marginTop: "" }} count={2} />
                <Skeleton containerClassName="block mt-5" style={{ display: "block", width: "100px", padding: "7px" }} />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center gap-3">
          {[1, 2, 3, 4, 5].map(item => {
            return (
              <Skeleton key={item} containerClassName="block mt-5" style={{width : "30px",height: "30px", display: "block"}}/>
              
            )
          })}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoadingArticle;

"use client";
import React from "react";
import "./loading.css";
const LoadingIcon = () => {


  return (
    <>
      <div className="overLay bg-black opacity-60 w-screen h-screen inset-0 fixed z-10"></div>
      <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="">
          <svg className="container-icon drop-shadow-2xl" x="0px" y="0px" viewBox="0 0 37 37" height="60" width="60" preserveAspectRatio="xMidYMid meet">
            <path
              className="track"
              fill="none"
              strokeWidth="5"
              pathLength="100"
              d="M36.63 31.746 c0 -13.394 -7.3260000000000005 -25.16 -18.13 -31.375999999999998 C7.696 6.66 0.37 18.352 0.37 31.746 c5.328 3.108 11.544 4.8839999999999995 18.13 4.8839999999999995 S31.301999999999996 34.854 36.63 31.746z"
            ></path>
            <path
              className="car"
              fill="none"
              strokeWidth="5"
              pathLength="100"
              d="M36.63 31.746 c0 -13.394 -7.3260000000000005 -25.16 -18.13 -31.375999999999998 C7.696 6.66 0.37 18.352 0.37 31.746 c5.328 3.108 11.544 4.8839999999999995 18.13 4.8839999999999995 S31.301999999999996 34.854 36.63 31.746z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default LoadingIcon;

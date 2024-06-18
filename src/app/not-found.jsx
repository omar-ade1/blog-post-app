import Image from "next/image";
import Link from "next/link";
import React from "react";
import _404errorImage from "../../public/404error.svg";

const NotFound = () => {
  return (
    <div className="container fix-height py-[50px] flex flex-col items-center">
      <Image src={_404errorImage} alt="error 404" />
      <h2 className="text-4xl font-bold text-blue-700">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <button className="text-xl font-bold bg-blue-600 p-2 rounded mt-5 text-white hover:scale-110 transition-all duration-200">Home Page</button>
      </Link>
    </div>
  );
};

export default NotFound;

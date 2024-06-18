"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GET_ARTICLE_COUNT } from "../../app/fetchApis/articles/getArticleCount";
import { ARTICLE_IN_ONE_PAGE } from "../../utils/articleInPage";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const Pagnation = ({ setPageNumber, pageNumber, searchText, path }) => {
  // This Is Array Of Number Of Pages Like If There Is 5 Pages This Is Equal To [1,2,3,4,5]
  const [numberOfPages, setNumberOfPages] = useState([]);
  // Get The Number Of Pages
  const getNumberOfPages = async () => {
    // Count Of All Articles
    const count = await GET_ARTICLE_COUNT(searchText);

    // Array Of Number Of Pages
    let arrNumPages = Array.from({ length: Math.ceil(count.data.count / ARTICLE_IN_ONE_PAGE) }, (value, index) => index + 1);
    setNumberOfPages(arrNumPages);
  };

  useEffect(() => {
    getNumberOfPages();
  }, [searchText]);

  return (
    <div className="mt-10 w-fit mx-auto">
      {numberOfPages.length > 1 && (
        <ul className="flex flex-wrap justify-center gap-3">
          {/* Show It If User Is Not In Page 1 */}
          {pageNumber > 1 && (
            <li>
              <Link
                onClick={() => {
                  setPageNumber(pageNumber - 1);
                }}
                href={`${path}?pageNumber=${pageNumber - 1}`}
                className="border-2 dark:text-white dark:border-white dark:hover:text-black rounded-xl hover:bg-blue-200 border-black w-fit p-1 font-bold capitalize h-[40px] flex justify-center items-center"
              >
                <GrPrevious />
              </Link>
            </li>
          )}

          {numberOfPages.map((value) => {
            return (
              <li key={value}>
                <Link
                  onClick={() => {
                    setPageNumber(value);
                  }}
                  className={`border-2  dark:border-white dark:hover:text-black  rounded-xl  hover:bg-blue-200 border-black w-[40px] h-[40px] flex justify-center items-center font-bold ${
                    pageNumber == value ? "bg-blue-500 text-white" : "bg-white text-black dark:bg-transparent  dark:text-white"
                  }`}
                  href={`${path}?pageNumber=${value}`}
                >
                  {value}
                </Link>
              </li>
            );
          })}

          {/* Show It If User Is Not In Last Page */}
          {pageNumber < numberOfPages.length && (
            <li>
              <Link
                onClick={() => {
                  setPageNumber(pageNumber + 1);
                }}
                className="border-2 dark:text-white dark:border-white dark:hover:text-black rounded-xl hover:bg-blue-200 border-black w-fit p-1 font-bold capitalize h-[40px] flex justify-center items-center"
                href={`${path}?pageNumber=${pageNumber + 1}`}
              >
                <GrNext />
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Pagnation;

import Link from "next/link";
import React from "react";
import { IoAdd } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import { AiOutlineMenuFold } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className="w-[200px] smT0:w-[50px] px-3 fix-height bg-slate-300 dark:bg-gray-700 transitionDarkMode">
      <Link href="/admin-dash-board" className="flex items-center justify-center gap-3 text-2xl font-bold mt-5 dark:text-white">
        <AiOutlineMenuFold className="text-3xl smT0:text-5xl" />
        <h2 className="uppercase smT0:hidden">Sidebar</h2>
      </Link>

      <hr className="mt-2 border-t-4" />
      <hr className="mt-2 border-t-4" />

      <div className="links mt-5">
        <ul className="divide-y-2">
          <li>
            <Link
              title="manage articles"
              href="/admin-dash-board"
              className="flex justify-center items-center font-bold capitalize p-1 dark:text-white dark:hover:text-violet-500 hover:text-violet-800"
            >
              <CiSettings className="text-2xl smT0:text-3xl" />
              <p className="smT0:hidden">articles</p>
            </Link>
          </li>

          <li>
            <Link
              title="add article"
              href="/admin-dash-board/add-article"
              className="flex justify-center items-center font-bold capitalize p-1 dark:text-white dark:hover:text-violet-500 hover:text-violet-800"
            >
              <IoAdd className="text-2xl smT0:text-3xl" />
              <p className="smT0:hidden">add article</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

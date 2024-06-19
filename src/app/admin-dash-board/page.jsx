"use client";

import React, { useEffect, useState } from "react";
import { allArticlesData } from "../fetchApis/articles/getAllArticles";
import LoadingCustom from "../../components/loadingCustom/LoadingCustom";
import { DELETE_ARTICLE } from "../fetchApis/articles/deleteArticle";
import Swal from "sweetalert2";
import Pagnation from "../../components/pagnation/Pagnation";
import NoArticlesFounded from "../articles/components/NoArticlesFounded";
import { EDIT_ARTICLE } from "../fetchApis/articles/editArticle";
import DeleteAllArticlesBtn from "./components/DeleteAllArticlesBtn";
import Link from "next/link";
import { motion } from "framer";
import { Toast } from "../../components/toast";
import moment from "moment";

const AdminDashBoard = () => {
  const [refresh, setRefresh] = useState(true);

  // Article Data
  const [article, setArticle] = useState([]);

  // Loading Page In First
  const [loading, setLoading] = useState(true);

  // Loading Page While Search About Article
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Search Text Value
  const [searchText, setSearchText] = useState("");

  // Page Number
  const [pageNumber, setPageNumber] = useState(1);

  const [titleUpdate, setTitleUpdate] = useState("");
  const [descUpdate, setDescUpdate] = useState("");

  // Handle Delete Function
  const handleDeleteArticle = async (id) => {
    // show loading
    setLoading(true);

    // fetch api
    const message = await DELETE_ARTICLE(id);
    // Check If Deleted Successful Or Not
    if (message.request.status == 200) {
      Toast.fire({
        icon: "success",
        title: message.data.message,
      });
      setArticle((prevArticles) => prevArticles.filter((article) => article.id !== id));
      setRefresh(!refresh);
    } else {
      Toast.fire({
        icon: "error",
        title: message.response.data.message,
      });
    }

    // Hide Loading
    setLoading(false);
  };

  // Alert Cofrim
  const alertConfirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want To Delete This Article!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "dark:bg-gray-800",
        title: "dark:text-white",
        htmlContainer: "dark:!text-[#eee]",
        icon: "dark:!border-yellow-500 dark:!text-yellow-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Run Delete Function
        handleDeleteArticle(id);
      }
    });
  };

  // Handle Article Date
  const handleArticleDate = (date) => {
    const date1 = moment.utc(date);
    return date1.local().format("dddd, LL, LTS");
  };

  // Get All Articles Data When searchText Chanaged
  useEffect(() => {
    // Show Loading Search Component
    setLoadingSearch(true);

    // Get All Articles Or All Articles That Title Is Contain The Search Text Value
    const getAllArticles = allArticlesData(searchText, pageNumber)
      .then((data) => {
        setArticle(data.data);
        // Hidden Loading Page First When Get Data In First Time
        setLoading(false);

        // Hidden Loading Search When Getting Data After Search
        setLoadingSearch(false);
      })

      // While Error
      .catch((error) => {
        console.error(error);
      });
  }, [searchText, pageNumber, refresh]);

  // This For Decrease Page Number When Count Of Article In This Page Equal To Zero
  useEffect(() => {
    if (pageNumber > 1 && article.length < 1) {
      setPageNumber(pageNumber - 1);
    }
  }, [refresh, article]);

  const alertTitle = (id, title, desc) => {
    (async () => {
      // Default Value
      const inputValue = title;
      const { value: newTitle } = await Swal.fire({
        title: "Update Article",
        input: "text",
        inputLabel: "New Title",
        inputValue,
        showCancelButton: true,
        showCloseButton: true,
        customClass: {
          popup: "dark:bg-gray-800",
          title: "dark:text-white",
          htmlContainer: "dark:!text-[#eee]",
          input: "dark:!text-[#eee]",
          inputLabel: "dark:!text-[#eee]",
          icon: "dark:!border-yellow-500 dark:!text-yellow-500",
        },
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });
      if (newTitle) {
        setTitleUpdate(newTitle);
        alertDesc(id, desc, newTitle);
      }
    })();
  };

  const alertDesc = async (id, desc, newTitle) => {
    const { value: newDesc } = await Swal.fire({
      input: "textarea",
      inputValue: desc,
      inputLabel: "New Description",
      inputPlaceholder: "A New Description...",
      customClass: {
        popup: "dark:bg-gray-800",
        title: "dark:text-white",
        htmlContainer: "dark:!text-[#eee]",
        input: "dark:!text-[#eee]",
        inputLabel: "dark:!text-[#eee]",
        icon: "dark:!border-yellow-500 dark:!text-yellow-500",
      },
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
      inputAttributes: {
        "aria-label": "A New Description",
      },
      showCancelButton: true,
    });

    if (newDesc) {
      setDescUpdate(newDesc);
      handleEdit(id, newTitle, newDesc);
      setRefresh(!refresh);
    }
  };

  // todo edit article

  const editArticle = async (id, title, desc) => {
    alertTitle(id, title, desc);
  };
  const handleEdit = async (id, newTitle, newDesc) => {
    setLoading(true);
    const message = await EDIT_ARTICLE(id, newTitle, newDesc);
    // Check If Deleted Successful Or Not
    setLoading(false);
    setRefresh("dvsv");
    if (message.request.status == 200) {
      Toast.fire({
        icon: "success",
        title: message.data.message,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: message.response.data.message,
      });
    }

    // Hide Loading
  };

  return (
    <div className="py-[50px] dark:bg-gray-900 transitionDarkMode">
      {loading ? (
        <div className="mt-5 w-full p-2 flex justify-center items-center">
          <LoadingCustom />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center capitalize mt-5 dark:text-white">all articles</h2>
          {article.length ? (
            <div className="container">
              <div className="flex flex-col w-full overflow-auto">
                <table className="p-2 w-full rounded divide-y-2 relative overflow-auto border-2 dark:border-gray-500 mt-5">
                  <thead className="w-full bg-gray-200 dark:bg-gray-600">
                    <tr className="divide-x-2 divide-white dark:divide-gray-500">
                      <th className="capitalize text-lg dark:text-white">ID</th>
                      <th className="capitalize text-lg dark:text-white">title</th>
                      <th className="capitalize text-lg dark:text-white">description</th>
                      <th className="capitalize text-lg dark:text-white">created at</th>
                      <th className="capitalize text-lg dark:text-white">updated at</th>
                      <th className="capitalize text-lg dark:text-white">actions</th>
                    </tr>
                  </thead>

                  <tbody className="w-full divide-y-2 dark:divide-gray-500">
                    {article.map((item) => (
                      <tr
                        key={item.id}
                        className="divide-x-2 dark:divide-gray-500 even:bg-gray-100 odd:bg-white dark:even:bg-gray-400 dark:odd:bg-slate-400 dark:hover:bg-zinc-600 dark:hover:text-white hover:bg-blue-100 transitionDarkMode"
                      >
                        <td className="text-center p-2 max-w-[200px] truncate">{item.id}</td>
                        <td className="text-center p-2 max-w-[200px] truncate">{item.title}</td>
                        <td className="text-center p-2 max-w-[200px] truncate">{item.description}</td>
                        <td className="text-center p-2 w-fit truncate">{handleArticleDate(item?.createdAt)}</td>
                        <td className="text-center p-2 w-fit truncate">{handleArticleDate(item?.updateAt)}</td>
                        <td className="text-center p-2 flex justify-center items-center gap-2">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
                            <Link href={`/articles/${item.id}`} className="capitalize p-2 bg-blue-500 rounded text-white font-bold">
                              info
                            </Link>
                          </motion.div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1 }}
                            onClick={() => editArticle(item.id, item.title, item.description)}
                            className="capitalize p-2 bg-orange-500 rounded text-white font-bold"
                          >
                            edit
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1 }}
                            onClick={() => alertConfirmDelete(item.id)}
                            className="capitalize p-2 bg-red-500 rounded text-white font-bold"
                          >
                            delete
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <DeleteAllArticlesBtn setRefresh={setRefresh} refresh={refresh} />
              <Pagnation path={"/admin-dash-board"} setPageNumber={setPageNumber} pageNumber={pageNumber} searchText={searchText} />
            </div>
          ) : (
            <NoArticlesFounded />
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;

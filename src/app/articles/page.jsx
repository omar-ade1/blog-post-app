"use client";
import React, { useEffect, useState } from "react";
import Article from "./components/Article";
import { allArticlesData } from "../fetchApis/articles/getAllArticles";
import LoadingArticle from "./loading";
import LoadingSearch from "./components/LoadingSearch";
import NoArticlesFounded from "./components/NoArticlesFounded";
import Pagnation from "../../components/pagnation/Pagnation";
import articlesImage from "../../../public/articles.webp";
import { motion, AnimatePresence } from "framer";

const Articles = () => {
  // Article Data
  const [article, setArticle] = useState();
  // Loading Page In First
  const [loading, setLoading] = useState(true);

  // Loading Page While Search About Article
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Search Text Value
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

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
  }, [searchText, pageNumber]);

  return (
    <div className="fix-height dark:bg-gray-900 transitionDarkMode ">
      <div
        style={{ backgroundImage: `url(${articlesImage.src})` }}
        className="h-[300px] flex justify-center items-center relative bg-cover bg-center w-full before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-65 "
      >
        <h2 className="relative text-4xl font-bold capitalize text-blue-600 text-center">articles page</h2>
      </div>
      {
        // Show Loading Page If Loading State Is True Or Show The Other Elements
        loading ? (
          <LoadingArticle />
        ) : (
          <div className="mt-5 py-[50px]">
            <div className="container">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search About Articles"
                className="border-2 relative z-[1] border-gray-400 dark:border-gray-500 dark:text-white dark:bg-gray-600 text-lg outline-none block mx-auto rounded w-[clamp(300px,100%,600px)] p-3 focus:border-blue-500"
                type="search"
              />

              <AnimatePresence>
                {
                  // Check The Article Length If 0 Show No Article Text Else Show Articles
                  article?.length ? (
                    <>
                      {
                        // Checking Laoding Search If True Show Laoding Search Component Else Show Article That Title's Equal To Search Text
                        loadingSearch ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <LoadingSearch />
                          </motion.div>
                        ) : (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="articles grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-5 gap-5">
                              {article?.map((item) => {
                                return <Article title={item.title} id={item.id} description={item.description} key={item.id} />;
                              })}
                            </div>
                            <Pagnation path={"/articles"} setPageNumber={setPageNumber} pageNumber={pageNumber} searchText={searchText} />
                          </motion.div>
                        )
                      }
                    </>
                  ) : (
                    <NoArticlesFounded />
                  )
                }
              </AnimatePresence>

            </div>
          </div>
        )
      }
    </div>
  );
};

export default Articles;

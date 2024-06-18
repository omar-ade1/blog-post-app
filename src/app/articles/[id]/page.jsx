"use client";
import React, { useEffect, useState } from "react";
import { singleArticle } from "../../fetchApis/articles/getSingleArticle";
import LoadingSingleArticle from "./loading";
import FormComment from "./components/FormComment";
import Comment from "./components/Comment";
import { GET_ALL_COMMENTS } from "../../fetchApis/comments/getAllComments";
import { motion, AnimatePresence } from "framer";

const SingelArticle = ({ params }) => {
  const [articles, setArticles] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  // Get Single Article Data
  useEffect(() => {
    const getSignleArticle = singleArticle(params.id)
      .then((data) => {
        setArticles(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

  useEffect(() => {
    const message = GET_ALL_COMMENTS(params.id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);



  return (
    <div className="dark:bg-gray-900 transitionDarkMode">
      {loading ? (
        <LoadingSingleArticle />
      
      ) : (
        <div className="">
          <div className="container fix-height flex pt-10 items-center flex-col ">
            <div className="w-[clamp(300px,100%,700px)]  py-[50px]">
              <div className="box dark:bg-gray-800 dark:border-gray-600 border  rounded p-3 shadow-xl transitionDarkMode">
                <h3 className="text-xl dark:text-white font-bold capitalize break-all text-wrap text-[#]">{articles?.title}</h3>
                <hr className="border-t-2 mt-2" />
                <hr className="border-t-2 mt-2" />
                <p className="text-lg mt-3 dark:text-[#b5b5b5] font-semibold leading-[1.8] break-all text-wrap">{articles?.description}</p>
              </div>
              <div className="comment-container dark:bg-gray-800 dark:border-gray-600 mt-10 shadow-xl border p-5 rounded">
                <h2 className="text-xl font-bold capitalize text-blue-700  text-center">comments</h2>
                <FormComment setReload={setReload} reload={reload} articleId={params.id} />
                  <AnimatePresence mode="popLayout">
                <div className="">
                    {comments?.comments?.map((comment) => {
                      return (
                        <motion.div
                          className="odd:bg-blue-50 even:bg-gray-50 dark:odd:bg-gray-700 dark:even:bg-gray-600"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: "spring" }}
                          layout
                          key={comment.id}
                        >
                          <Comment
                            setReload={setReload}
                            reload={reload}
                            isAdmin={comments.isAdmin}
                            idUserFromToken={comments.idUserFromToken}
                            commentData={comment}
                          />
                        </motion.div>
                      );
                    })}
                </div>
                  </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingelArticle;

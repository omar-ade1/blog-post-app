import Image from "next/image";
import advantagesImg from "../../public/advantages.svg";
import homePageImg from "../../public/homePage.webp";
import Link from "next/link";
import { TiTickOutline } from "react-icons/ti";

export default function Home() {
  const data = ["High-Quality Content", "Wide Range of Topics", "User-Friendly Design", "Engaging and Informative"];

  return (
    <div>
      <section
        style={{ backgroundImage: `url(${homePageImg.src})` }}
        className="relative landing bg-cover h-[calc(100vh-150px)] flex flex-col justify-center items-center  before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-70"
      >
        <div className="relative text-center capitalize text-white">
          <h2 className="text-4xl font-bold">
            Welcome to <span className="text-blue-600">Blog Post</span>
          </h2>
          <p className="mt-2 max-w-[300px] mx-auto"> your destination for insightful articles and engaging content!</p>

          <Link
            href="/articles"
            className="block w-fit mx-auto mt-5 p-2 bg-blue-700 text-white font-bold rounded text-xl capitalize hover:bg-blue-800 hover:scale-105 transition-all duration-200"
          >
            <span className="animate-pulse">start now</span>
          </Link>
        </div>

        <Link href="#about" className="absolute bottom-[50px] cursor-pointer">
          <div className="w-[30px] h-[30px] border-l-4 border-white border-b-4 dark:border-blue-600 home-page-arrow transitionDarkMode"></div>
          <div className="w-[30px] h-[30px] border-l-4 border-white border-b-4 dark:border-blue-600 home-page-arrow transitionDarkMode"></div>
        </Link>
      </section>

      <section id="about" className="py-[50px] bg-[#f0f8ff] dark:bg-gray-900 transitionDarkMode">
        <div className="container flex justify-around mdT0:flex-col mdT0:items-center">
          <div className="max-w-[500px] mdT0:max-w-full">
            <h2 className="text-3xl dark:text-white font-bold capitalize tracking-wider ">
              about <span className="text-blue-600">blog post</span>
            </h2>
            <p className="mt-5 text-gray-500 dark:text-[#cbcbcb] font-semibold">
              Welcome to Blog Post, your ultimate source for diverse and engaging articles. Our mission is to provide readers with high-quality
              content across a variety of topics, including technology, health, lifestyle, and more. We believe in the power of information to
              inspire, educate, and entertain, and we are committed to bringing you the latest trends, insights, and stories.
            </p>
            <div className="mt-5">
              {data.map((item, index) => {
                return (
                  <p className="flex items-center gap-2 text-xl font-bold text-gray-500 dark:text-[#cbcbcb]" key={index}>
                    <span>
                      <TiTickOutline className="text-3xl text-gray-500 dark:text-[#cbcbcb]" />
                    </span>
                    {item}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="mdT0:mt-5">
            <Image className="w-[400px] max-w-full" src={advantagesImg} alt="advantage" />
          </div>
        </div>
      </section>
    </div>
  );
}

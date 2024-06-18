import Link from "next/link";
import React from "react";

const TextLogin = () => {
  return (
    <div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Login To Your Account</h2>
      <p className="text-center text-sm text-gray-600 max-w">
        Or
        <Link href="/sign-up" className="font-medium block text-blue-600 hover:text-blue-500 capitalize">
          create an account
        </Link>
      </p>
    </div>
  );
};

export default TextLogin;

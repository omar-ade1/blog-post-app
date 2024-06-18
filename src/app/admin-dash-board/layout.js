import { cookies } from "next/headers";
import Sidebar from "./components/Sidebar";
import { checking } from "../../utils/checkToken";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const cookie = cookies().get("jwtToken")?.value;
  const userToken = await checking(cookie);

  // To Redirect To Home Page If No Token
  if (!userToken) {
    redirect("/");
  }

  if (userToken.isAdmin == false) {
    redirect("/");
  }

  return (
    <div className="flex space-x-5 dark:bg-gray-900 transitionDarkMode">
      <Sidebar />
      <main className="flex-1 smT0:max-w-[calc(100%-100px)] max-w-[calc(100%-190px)]">{children}</main>
    </div>
  );
}

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { setCorsHeaders } from "../../../../utils/core";

/*
 * @method : GET
 * @des    : LogOut User
 * @path   : ~/api/log-out
 * @accuss : private
 */

export function GET(request: NextRequest) {
  try {
    const response = new NextResponse();
    setCorsHeaders(response); // إعداد CORS

    const jwtToken = cookies().get("jwtToken");
    if (jwtToken) {
      cookies().delete("jwtToken");
      return NextResponse.json({ message: "Log Out Done" }, { status: 200 });
    }
    return NextResponse.json({ message: "no account founded to log out" }, { status: 404 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

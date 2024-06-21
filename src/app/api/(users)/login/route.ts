import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../utils/db";
import { z } from "zod";
import { payloadJwt } from "../../../../utils/interfaces";
import { generateCookie } from "../../../../utils/generateToken";
import * as argon2 from "argon2";
import { setCorsHeaders } from "../../../../utils/core";

/*
 * @method : POST
 * @des    : Login User
 * @path   : ~/login
 * @accuss : public
 */

type body = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  try {
    const response = new NextResponse();
    setCorsHeaders(response); // إعداد CORS
  

    const body: body = await request.json();

    // Create Schema For Checking The Inputs
    const bodySchema = z.object({
      email: z.string().min(5).email(),
      password: z.string().min(6, "Password must contain at least 6 character(s)"),
    });

    // Checking
    const validation = bodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }

    // Get User From Database
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    // If No User Or Password Is Uncorrect
    if (!user) {
      return NextResponse.json({ message: "Invalid Email Or Password" }, { status: 400 });
    }

    
    if (await argon2.verify(user.password, body.password)) {

      const payloadJwt: payloadJwt = {
        id: user.id,
        isAdmin: user.isAdmin,
        userName: user.userName,
        email: user.email,
        password: user.password,
      };

      // Generate Token
      const cookie = generateCookie(payloadJwt);

      // Return All Articles
      return NextResponse.json(
        { message: "Successful Login" },
        {
          status: 200,
          headers: {
            "Set-Cookie": cookie,
          },
        }
      );
    } else {
      // Password Did Not Match
      return NextResponse.json({ message: "Invalid Email Or Password" }, { status: 400 });
    }

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

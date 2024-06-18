import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import prisma from "../../../../utils/db";
import { payloadJwt } from "../../../../utils/interfaces";
import { generateCookie, generateToken } from "../../../../utils/generateToken";
import * as argon2 from "argon2";

/*
 * @method : POST
 * @des    : Add A New User
 * @path   : ~/api/sign-up
 * @accuss : public
 */

type body = {
  email: string;
  password: string;
  userName: string;
};
export async function POST(request: NextRequest) {
  try {
    // Get Info Article From User
    const body: body = await request.json();

    // Check Email Is Exists Or Not
    const checkEmail = await prisma.user.findUnique({ where: { email: body.email } });

    // Checking
    if (checkEmail) {
      return NextResponse.json({ message: "This Email Is Already Exists" }, { status: 400 });
    }

    // Create Schema For Checking The Inputs
    const bodySchema = z.object({
      userName: z.string().min(2, "userName must contain at least 2 character(s)").max(30, "userName must contain at most 30 character(s)"),
      email: z.string().min(5).email(),
      password: z.string().min(6, "Password must contain at least 6 character(s)"),
    });

    // Checking
    const validation = bodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }

    // Hash Password
    // const argon2 = require('argon2');
    const hashPassword = await argon2.hash(body.password);

    // Create A New User
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashPassword,
        userName: body.userName,
      },
      select: {
        email: true,
        userName: true,
        id: true,
        isAdmin: true,
        password: true,
      },
    });

    // Payload For JWT
    const payloadJwt: payloadJwt = {
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      userName: newUser.userName,
      email: newUser.email,
      password: newUser.password,
    };

    // Generate Token
    const cookie = generateCookie(payloadJwt);

    // Return Success Message
    return NextResponse.json(
      { message: "Create Account Successful" },
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

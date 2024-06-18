import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../utils/db";
import jwt from "jsonwebtoken";
import { payloadJwt } from "../../../../../utils/interfaces";
import { cookies } from "next/headers";
import { z } from "zod";
import { generateCookie } from "../../../../../utils/generateToken";
import * as argon2 from "argon2";

/*
 * @method : DELETE
 * @des    : Delete User
 * @path   : ~/api/profile/:id
 * @accuss : private
 */

export async function DELETE(request: NextRequest, { params }) {
  try {
    // Get Jwttoken From Cookies
    const authToken = request.cookies.get("jwtToken");
    const token = authToken?.value as string;

    // Check If Token Is Defined Or Not
    if (!token) {
      return NextResponse.json({ message: "token is not defined, please sign in first" }, { status: 400 });
    }

    // Decode Token And Get Data From It
    const userFromToken = jwt.verify(token, process.env.PRIVATE_KEY_JWT) as payloadJwt;

    // Get User From Database And Check If User Is Exists Or Not
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    // Check If Id From Token Is Equal To Id User From Database
    if (userFromToken.id !== user.id) {
      return NextResponse.json({ message: "you don't have accuss to delete this account" });
    }


    // Delete The User Comments From Database
    await prisma.comment.deleteMany({where: {userId : parseInt(params.id)}})

    // Delete Account From Database
    await prisma.user.delete({ where: { id: parseInt(params.id) } });
      
    
    // Delete Token From Cookies
    cookies().delete("jwtToken");
    
    // Return Successful Message
    return NextResponse.json({ message: "Delete User Successful" }, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/*
 * @method : PUT
 * @des    : Update User
 * @path   : ~/api/profile/:id
 * @accuss : private
 */
export async function PUT(request: NextRequest, { params }) {
  try {
    // Get Jwttoken From Cookies
    const authToken = request.cookies.get("jwtToken");
    const token = authToken?.value as string;

    // Check If Token Is Defined Or Not
    if (!token) {
      return NextResponse.json({ message: "token is not defined, please sign in first" }, { status: 400 });
    }

    // Type Of Body
    type bodyType = {
      userName: string;
      passwordL: string;
      passwordU: string;
    };

    // Get Data From User
    const body: bodyType = await request.json();

    // Body Schema
    const bodySchema = z.object({
      userName: z
        .string()
        .min(2, "userName must contain at least 2 character(s)")
        .max(30, "userName must contain at most 30 character(s)")
        .optional(),
      passwordL: z.string().min(6, "Password must contain at least 6 character(s)").optional(),
      passwordU: z.string().min(6, "Password must contain at least 6 character(s)").optional(),
    });

    // Checking
    const validation = bodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }

    // Decode Token And Get Data From It
    const userFromToken = jwt.verify(token, process.env.PRIVATE_KEY_JWT) as payloadJwt;

    // Get User From Database And Check If User Is Exists Or Not
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    // Check If Id From Token Is Equal To Id User From Database
    if (userFromToken.id !== user.id) {
      return NextResponse.json({ message: "you don't have accuss to update this account" });
    }

    // fix
    // Check If Passwords Filed In Request Are Exists Or Not
    if (body.passwordL && body.passwordU) {
      // Check If Password From Token Matches The Password That User Type It
      if (await argon2.verify(userFromToken.password, body.passwordL)) {
        
        // Check If New Password Equal Current Password Or Not
        if (await argon2.verify(userFromToken.password, body.passwordU)) {
          return NextResponse.json(
            { message: "The new password cannot be the same as the old password. Please choose a different password." },
            { status: 400 }
          );
        }

        // Hash Password
        const hashNewPassword = await argon2.hash(body.passwordU);
        body.passwordU = hashNewPassword;

        // Update Account In Database
        await prisma.user.update({
          where: { id: parseInt(params.id) },
          data: {
            password: body.passwordU,
          },
        });

        // Delete Old Token From Cookies
        cookies().delete("jwtToken");

        // Get A New Data From Database
        const newUser = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });

        // Payload For JWT
        const payloadJwt: payloadJwt = {
          id: newUser.id,
          isAdmin: newUser.isAdmin,
          userName: newUser.userName,
          email: newUser.email,
          password: newUser.password,
        };

        // generate a new cookie with a new data
        const cookie = generateCookie(payloadJwt);

        // Return Successful Message
        return NextResponse.json(
          { message: "Successful Update" },
          {
            status: 200,
            headers: {
              "Set-Cookie": cookie,
            },
          }
        );
      } else {
        return NextResponse.json({ message: "Your Password Is Not Correct" }, { status: 400 });
      }
    }
    // fix

    // Update Account In Database
    if (body.userName) {
      await prisma.user.update({
        where: { id: parseInt(params.id) },
        data: {
          userName: body.userName,
          // password: body.passwordU,
        },
      });

      // Get A New User From Database
      const newUser = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });

      // Delete Old Token From Cookies
      cookies().delete("jwtToken");

      // Payload For JWT
      const payloadJwt: payloadJwt = {
        id: newUser.id,
        isAdmin: newUser.isAdmin,
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
      };


      // Generate A New Cookie With A New Data
      const cookie = generateCookie(payloadJwt);

      // Return Successful Message
      return NextResponse.json(
        { message: "Successful Update" },
        {
          status: 200,
          headers: {
            "Set-Cookie": cookie,
          },
        }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

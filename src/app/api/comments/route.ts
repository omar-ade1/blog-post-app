import { NextRequest, NextResponse } from "next/server";
import { payloadJwt } from "../../../utils/interfaces";
import jwt from "jsonwebtoken";
import prisma from "../../../utils/db";
import { z } from "zod";
import { cookies } from "next/headers";

/*
 * @method : GET
 * @des    : Get All Comments
 * @path   : ~/comments
 * @accuss : public
 */

export async function GET(request: NextRequest) {
  const articleID = request.nextUrl.searchParams.get("articleId");

  const cookie = cookies().get("jwtToken").value;
  const userFromToken = jwt.verify(cookie, process.env.PRIVATE_KEY_JWT) as payloadJwt;

  const allComments = await prisma.comment.findMany({
    where: { articleId: parseInt(articleID) },

    include: {
      user: {
        select: {
          userName: true,
          isAdmin: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  if (!allComments.length) {
    return NextResponse.json({ message: "No Comments Founded" }, { status: 404 });
  }

  return NextResponse.json({ comments: [...allComments], idUserFromToken: userFromToken.id, isAdmin: userFromToken.isAdmin }, { status: 200 });
}

/*
 * @method : POST
 * @des    : Add A New Comment
 * @path   : ~/comments
 * @accuss : public
 */

export async function POST(request: NextRequest) {
  try {
    type body = {
      text: string;
      articleId: string;
      // userId: string;
    };

    const body: body = await request.json();

    // Create Schema For Checking The Inputs
    const bodySchema = z.object({
      text: z.string().min(1),
      articleId: z.string().min(1),
      // userId: z.string().min(1),
    });

    // Checking
    const validation = bodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }

    // Get Jwttoken From Cookies
    const authToken = request.cookies.get("jwtToken");
    const token = authToken?.value as string;

    // Check If Token Is Defined Or Not
    if (!token) {
      return NextResponse.json({ message: "token is not defined, please sign in first" }, { status: 400 });
    }

    // Decode Token And Get Data From It
    const userFromToken = jwt.verify(token, process.env.PRIVATE_KEY_JWT) as payloadJwt;
    const userId = userFromToken.id as string;

    const article = await prisma.article.findUnique({ where: { id: parseInt(body.articleId) } });

    if (!article) {
      return NextResponse.json({ message: "Article Not Found" }, { status: 404 });
    }


    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: parseInt(body.articleId),
        userId: parseInt(userId),
      },
    });

    return NextResponse.json({ message: "add comment successful" }, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

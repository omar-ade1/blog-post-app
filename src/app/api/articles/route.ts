import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../utils/db";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { payloadJwt } from "../../../utils/interfaces";
import { ARTICLE_IN_ONE_PAGE } from "../../../utils/articleInPage";
import { setCorsHeaders } from "../../../utils/core";
/*
 * @method : GET
 * @des    : Get All Articles || Get Articles By Search
 * @path   : ~/articles
 * @accuss : public
 */
export async function GET(request: NextRequest) {
  try {
    const response = new NextResponse();
    setCorsHeaders(response); // إعداد CORS
  
    // Get Search Text From Url
    const searchText = request.nextUrl.searchParams.get("searchText");

    const pageNumber = request.nextUrl.searchParams.get("pageNumber");

    // Check Search Text
    if (searchText) {
      // If Founded Get Articles That Titles's Is Contain To Search Text
      const articlesSearch = await prisma.article.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          title: {
            contains: searchText,
            mode: "insensitive", // upper case || lower case
          },
        },

        skip: ARTICLE_IN_ONE_PAGE * (parseInt(pageNumber) - 1) || 0,
        take: ARTICLE_IN_ONE_PAGE,
      });
      // Return Search Articles
      return NextResponse.json(articlesSearch);
    }

    // Get Articles From Database
    const articles = await prisma.article.findMany({
      orderBy: {
        id: "desc",
      },
      skip: ARTICLE_IN_ONE_PAGE * (parseInt(pageNumber) - 1) || 0,
      take: ARTICLE_IN_ONE_PAGE,
    });

    // Return All Articles
    return NextResponse.json(articles, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/*
 * @method : POST
 * @des    : Add A New Article
 * @path   : ~/api/articles
 * @accuss : public
 */

export async function POST(request: NextRequest) {
  try {
    const response = new NextResponse();
    setCorsHeaders(response); // إعداد CORS
  

    type body = {
      title: string;
      description: string;
    };

    // Get Jwttoken From Cookies
    const authToken = request.cookies.get("jwtToken");
    const token = authToken?.value as string;

    // Check If Token Is Defined Or Not
    if (!token) {
      return NextResponse.json({ message: "token is not defined, please sign in first" }, { status: 400 });
    }
    // Decode Token And Get Data From It
    const userFromToken = jwt.verify(token, process.env.PRIVATE_KEY_JWT) as payloadJwt;

    // Check User Is Admin Or Not
    if (!userFromToken.isAdmin) {
      return NextResponse.json({ message: "Only Admin Can Add Articles" }, { status: 403 });
    }

    // Get Info Article From User
    const body: body = await request.json();

    // Create Schema For Checking The Inputs
    const bodySchema = z.object({
      title: z.string().min(3, "Title must contain at least 3 characters").max(200),
      description: z.string().min(80, "Description must contain at least 80 characters"),
    });

    // Checking
    const validation = bodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }

    // Create A New Article
    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    // Return Success Message
    return NextResponse.json({ message: "Add Article Successful" }, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


/*
 * @method : Delete
 * @des    : Delete All Articles
 * @path   : ~/api/articles
 * @accuss : Private
 */

export async function DELETE(request: NextRequest) {
  try {
    const response = new NextResponse();
    setCorsHeaders(response); // إعداد CORS
  

    // Get Jwttoken From Cookies
    const authToken = request.cookies.get("jwtToken");
    const token = authToken?.value as string;

    // Check If Token Is Defined Or Not
    if (!token) {
      return NextResponse.json({ message: "token is not defined, please sign in first" }, { status: 400 });
    }
    // Decode Token And Get Data From It
    const userFromToken = jwt.verify(token, process.env.PRIVATE_KEY_JWT) as payloadJwt;

    // Check User Is Admin Or Not
    if (!userFromToken.isAdmin) {
      return NextResponse.json({ message: "Only Admin Can Delete Articles" }, { status: 403 });
    }

    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();

    return NextResponse.json({ message: "All Articles And Comments Have Been Deleted Successfully." }, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

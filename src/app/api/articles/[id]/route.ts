import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../utils/db";
import { bodyArticleEdit, payloadJwt } from "../../../../utils/interfaces";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { setCorsHeaders } from "../../../../utils/core";

/*
 * @method : GET
 * @des    : Get Single Article
 * @path   : ~/articles/:id
 * @accuss : public
 */

export async function GET(request: NextRequest, { params }) {
  try {
    const response = new NextResponse();
    setCorsHeaders(response); // إعداد CORS
  
    // Get Article From Prisma
    const articles = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });

    // Check If Article From Prisma Is Founded
    if (!articles) {
      return NextResponse.json({ message: "Article Is Not Found" }, { status: 400 });
    }

    // Return Article With Status Code 201
    return NextResponse.json(articles, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/*
 * @method : PUT
 * @des    : Update Article
 * @path   : ~/articles/:id
 * @accuss : Private
 */
export async function PUT(request: NextRequest, { params }) {
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
    const idFromToken = userFromToken.id as string;
    // Get User From Database And Check If User Is Exists Or Not
    const user = await prisma.user.findUnique({ where: { id: parseInt(idFromToken) } });

    if (!user) {
      return NextResponse.json({ message: "No Token Founded , Please Login First" }, { status: 404 });
    }
    if (!user.isAdmin) {
      return NextResponse.json({ message: "Only Admin Can Edit Articles" }, { status: 403 });
    }

    // Get Article From Prisma
    const articles = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });

    // Check If Article From Prisma Is Founded
    if (!articles) {
      return NextResponse.json({ message: "Article Is Not Found" }, { status: 400 });
    }

    // Get Input From User
    const body: bodyArticleEdit = await request.json();

    // Create Schema For Checking The Inputs
    const bodySchema = z.object({
      title: z.string().min(3, "Title must contain at least 3 characters").max(200,"Title must contain at maximum 200 characters").optional(),
      description: z.string().min(80, "Description must contain at least 80 characters").optional(),
    });

    // Checking
    const validation = bodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }

    // Update Article
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    // Return Successful Message
    return NextResponse.json({ message: "Update Article Done" }, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/*
 * @method : DELETE
 * @des    : Delete Article
 * @path   : ~/articles/:id
 * @accuss : Private
 */
export async function DELETE(request: NextRequest, { params }) {
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
    const idFromToken = userFromToken.id as string;
    // Get User From Database And Check If User Is Exists Or Not
    const user = await prisma.user.findUnique({ where: { id: parseInt(idFromToken) } });

    if (!user) {
      return NextResponse.json({ message: "No Token Founded , Please Login First" }, { status: 404 });
    }
    if (!user.isAdmin) {
      return NextResponse.json({ message: "Only Admin Can Delete Articles" }, { status: 403 });
    }

    // Get Article From Prisma
    const articles = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });

    // Check If Article From Prisma Is Founded
    if (!articles) {
      return NextResponse.json({ message: "Article Is Not Found" }, { status: 404 });
    }

    // Delete Article Comments
    await prisma.comment.deleteMany({ where: { articleId: parseInt(params.id) } });

    // Delete Article
    const deleteArticle = await prisma.article.delete({
      where: { id: parseInt(params.id) },
    });

    // Return Successful Message
    return NextResponse.json({ message: "Delete Article Done" }, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

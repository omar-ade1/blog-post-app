import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/db";

export async function GET(request: NextRequest) {
  try {

    // Get Search Text From Url
    const searchText = request.nextUrl.searchParams.get("searchText");

    // Check If There Searchtext Or Not
    if (searchText) {

      // If True Return The Count Of Result Search
      const articleCount = await prisma.article.count({
        where: {
          title: {
            contains: searchText,
            mode: "insensitive", // upper case || lower case
          },
        },
      });
      return NextResponse.json({ count: articleCount }, { status: 200 });
    }


    // If False Return The Count Of All Articles
    const articleCount = await prisma.article.count();
    return NextResponse.json({ count: articleCount }, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

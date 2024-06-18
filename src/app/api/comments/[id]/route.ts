import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "../../../../utils/db";
import { payloadJwt } from "../../../../utils/interfaces";
import { z } from "zod";

/*
 * @method : DELETE
 * @des    : DELETE Comment
 * @path   : ~/comments
 * @accuss : Private
 */
export async function PUT(request: NextRequest, { params }) {
  try {
    type bodyType = {
      text: string;
    };
    const body: bodyType = await request.json();

    // Create Schema For Checking The Inputs
    const bodySchema = z.object({
      text: z.string().min(1),
    });

    // Checking
    const validation = bodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!comment) {
      return NextResponse.json({ message: "no comment founded" });
    }

    const token = cookies().get("jwtToken").value;
    if (!token) {
      return NextResponse.json({ message: "No Token Founded , You Must Login First" }, { status: 400 });
    }

    const userFromToken = jwt.verify(token, process.env.PRIVATE_KEY_JWT) as payloadJwt;

    if (userFromToken.id !== comment.userId) {
      return NextResponse.json({ message: "Access denied, you can't update other users' comments." }, { status: 401 });
    }
    await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: {
        text: body.text,
      },
    });

    return NextResponse.json({ message: "Comment Updated Done!" }, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/*
 * @method : DELETE
 * @des    : DELETE Comment
 * @path   : ~/comments
 * @accuss : Private
 */
export async function DELETE(request: NextRequest, { params }) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!comment) {
      return NextResponse.json({ message: "no comment founded" });
    }

    const token = cookies().get("jwtToken").value;
    if (!token) {
      return NextResponse.json({ message: "No Token Founded , You Must Login First" }, { status: 400 });
    }

    const userFromToken = jwt.verify(token, process.env.PRIVATE_KEY_JWT) as payloadJwt;

    // Check User Is Admin Or Not And This Is User' Comment Or Not
    if (userFromToken.id !== comment.userId && !userFromToken.isAdmin) {
      return NextResponse.json({ message: "Access denied, you can't delete other users' comments." }, { status: 401 });
    }

    await prisma.comment.delete({ where: { id: parseInt(params.id) } });

    // Msg After Delete Comment
    const MsgAfterDelete = () => {
      if (userFromToken.id == comment.userId) {
        return "comment deleted done";
      } else if (userFromToken.isAdmin) {
        return "as an admin , you can delete this comment";
      }
    };
    return NextResponse.json({ message: MsgAfterDelete() }, { status: 200 });

    // While Error
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json("Missing The URL", { status: 400 })
    }

    try {
      const existingLink = await prisma.link.findUnique({
        where: { originalUrl: url },
      });

      if (existingLink) {
        return NextResponse.json({ shortCode: existingLink.shortCode }, { status: 200 })
      }

      let shortCode: string;
      do {
        shortCode = Math.random().toString(36).substring(2, 8);
      } while (await prisma.link.findUnique({ where: { shortCode } }));

      const newLink = await prisma.link.create({
        data: {
          originalUrl: url,
          shortCode,
        },

      });

      return NextResponse.json({ shortCode: newLink.shortCode }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }



  } catch (error) {
    return NextResponse.json("Error happened", { status: 404, statusText: "Aditya Choudhury" })
  }

}
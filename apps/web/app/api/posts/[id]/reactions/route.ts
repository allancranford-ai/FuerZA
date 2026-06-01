import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/posts/[id]/reactions - Add a reaction (like/comment)
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { type, content } = await req.json();

    if (!type || !["like", "comment"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid reaction type" },
        { status: 400 }
      );
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // For likes, check if already liked
    if (type === "like") {
      const existing = await prisma.reaction.findFirst({
        where: {
          postId: params.id,
          userId: session.user.id,
          type: "like",
        },
      });

      if (existing) {
        // Unlike
        await prisma.reaction.delete({
          where: { id: existing.id },
        });
        return NextResponse.json({ liked: false });
      }
    }

    const reaction = await prisma.reaction.create({
      data: {
        type,
        content: type === "comment" ? content : null,
        userId: session.user.id,
        postId: params.id,
      },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    return NextResponse.json(
      { message: "Reaction added", reaction },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add reaction error:", error);
    return NextResponse.json(
      { error: "Failed to add reaction" },
      { status: 500 }
    );
  }
}

// GET /api/posts/[id]/reactions - Get all reactions for a post
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reactions = await prisma.reaction.findMany({
      where: { postId: params.id },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reactions });
  } catch (error) {
    console.error("Fetch reactions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reactions" },
      { status: 500 }
    );
  }
}

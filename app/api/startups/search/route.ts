import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/ConnectDB";
import Startup from "@/models/Startup";
import { PipelineStage } from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim() || "";

    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
    ];

    if (query && query.trim() !== "") {
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            { "author.name": { $regex: query, $options: "i" } },
          ],
        },
      } as PipelineStage.Match);
    }

    pipeline.push({ $sort: { createdAt: -1 } });

    const posts = await Startup.aggregate(pipeline);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}

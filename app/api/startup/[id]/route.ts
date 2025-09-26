import { NextRequest, NextResponse } from "next/server";
import Startup from "@/models/Startup";
import { StartupPopulated } from "@/models/Startup";
import connectDB from "@/lib/ConnectDB";
import "@/models/Author";
import { Types } from "mongoose";

export async function GET(req: NextRequest, {params}:{params:Promise<{id:string}>}) {
    connectDB()
    const {id} = await params;

const post = (
  await Startup.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
  ])
)[0]; 

    return NextResponse.json({post},{status:200});

}
import Startup from "@/models/Startup";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try {
        const {id} = await params;
        const startups = await Startup.aggregate([
            {
                $match:{
                    author: new Types.ObjectId(id)
                }
            },
            {
                $lookup:{
                    from: "authors",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $unwind: "$author"
            }
        ])

        return NextResponse.json({startups},{status:200})
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ startups: [] }, { status: 500 });
    }
}
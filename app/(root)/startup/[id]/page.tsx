import React from "react";
export const experimental_ppr = true;
import Link from "next/link";
import Image from "next/image";
import { IncViews } from "@/lib/actions";
import { Eye } from "lucide-react";

import markdownit from "markdown-it";
const md = markdownit();

async function getPost(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/startup/${id}`
    );

    const data = await res.json();

    return data.post;
  } catch (error) {
    console.log(error);
  }
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getPost(id);
  const parsedContent = md.render(post?.content || "");
  await IncViews(id);
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-200 opacity-80">
            {new Date(post?.createdAt).toLocaleDateString()}
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mt-4">
            {post?.title}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            {post?.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section_container mt-7 max-sm:px-1 pb-2.5">
        {/* Thumbnail */}
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full max-sm:h-[300px] h-[500px] rounded-xl overflow-hidden shadow-md">
            <Image
              src={post?.image || ""}
              alt="thumbnail"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Author + Category */}
          <div className="flex items-center justify-between mt-6">
            <Link
              href={`/user/${post?.author?._id}`}
              className="flex gap-3 items-center"
            >
              <Image
                src={post?.author?.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {post?.author?.name}
                </p>
                <p className="text-sm text-gray-500">@{post?.author?.name}</p>
              </div>
            </Link>

            <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200 rounded-full">
              {post?.category}
            </span>
          </div>

          {/* Pitch Details */}
          <div className="mt-10 space-y-5">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Pitch Details
            </h3>

            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="text-gray-500 italic">No details provided</p>
            )}
          </div>
        </div>
      </section>
      <div className="fixed bottom-4 right-4 z-50">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full 
                  bg-indigo-600 text-white shadow-md"
        >
          <Eye size={16} />
          <span className="text-sm font-medium">{post?.views}</span>
        </div>
      </div>
    </div>
  );
};

export default page;

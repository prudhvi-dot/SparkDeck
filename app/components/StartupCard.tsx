import React from "react";
import Image from "next/image";
import { Eye, Calendar } from "lucide-react";
import Link from "next/link";

export interface PostType {
  createdAt: string;
  views: number;
  author: { name: string; _id: number };
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
}

const StartupCard = ({ post }: { post: PostType }) => {
  const { createdAt, views, author, title, category, _id, image, description } =
    post;

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition  flex flex-col">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image src={image} alt={title} fill className="object-cover" priority />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <Link href={`/?query=${category}`}>
          <span className="inline-block cursor-pointer px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200 rounded-full w-fit">
            {category}
          </span>
        </Link>

        <Link href={`/startup/${_id}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 hover:text-indigo-600 transition">
            {title}
          </h2>
        </Link>

        <Link href={`/user/${author?._id}`}>
          <p className="text-sm text-gray-700 dark:text-gray-300 hover:underline">
            By {author?.name}
          </p>
        </Link>

        {/* Description + footer grouped in flex column */}
        <div className="flex flex-col flex-1">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-2">
            {description}
          </p>

          {/* Footer (date + views) sticks to bottom */}
          <div className="mt-auto flex items-center pt-0.5 justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>
                {new Date(createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Eye size={14} />
              <span>{views} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;

import SearchForm from "../components/SearchForm";
import StartupCard, { PostType } from "../components/StartupCard";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

async function getPosts(query?: string) {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/startups/search`
    );

    if (query && query.trim() !== "") {
      url.searchParams.append("query", query.trim());
    }

    const res = await fetch(url.toString(), { next: { revalidate: 60 } });

    if (!res.ok) {
      console.error("Failed to fetch posts:", res.statusText);
      return { posts: [] };
    }

    const data = await res.json();
    return { posts: data.posts || [] };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [] };
  }
}

// 🔹 Extract posts section into a child async component
async function PostsSection({ query }: { query?: string }) {
  const { posts } = await getPosts(query);

  return (
    <section className="max-w-7xl mx-auto px-2 py-16">
      <p className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
        {query ? `Search results for "${query}"` : "All Startups"}
      </p>

      {posts?.length > 0 ? (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post: PostType) => (
            <li key={post._id} className="list-none">
              <StartupCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No startups found.
        </p>
      )}
    </section>
  );
}

// 🔹 Page Component
export const experimental_ppr = true;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  return (
    <div>
      {/* Hero Section (always static) */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            🚀 Share Your Vision, <br /> Build the Future Together
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Pitch your boldest ideas, find collaborators, and grow your startup
            in a vibrant community of innovators.
          </p>

          <SearchForm query={query || ""} />
        </div>
      </section>

      {/* Posts Section (suspense for partial rendering) */}
      <Suspense
        fallback={
          <section className="max-w-7xl mx-auto px-2 py-16">
            <p className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
              {query ? `Search results for "${query}"` : "All Startups"}
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="h-64 w-full rounded-2xl shadow-md"
                />
              ))}
            </div>
          </section>
        }
      >
        <PostsSection query={query} />
      </Suspense>
    </div>
  );
}

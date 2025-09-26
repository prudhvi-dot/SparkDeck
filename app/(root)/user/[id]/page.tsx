import UserStartups from "@/app/components/UserStartups";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUser } from "@/lib/actions";
import React, { Suspense } from "react";
import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await fetchUser(id);
  const user = data._doc;

  return (
    <div className="max-w-6xl mx-auto mt-[90px] px-6 py-10">
      {/* User Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        {/* Avatar */}
        <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-lg">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="opacity-90 mt-1">{user.email}</p>

          {/* Optional bio/role */}
          {user.bio && (
            <p className="mt-3 leading-relaxed max-w-2xl mx-auto md:mx-0">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {/* Startups Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Startups by {user.name}
        </h2>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="h-64 w-full rounded-2xl shadow-md"
                />
              ))}
            </div>
          }
        >
          <UserStartups id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;

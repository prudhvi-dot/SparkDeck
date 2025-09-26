import React from "react";
import StartupCard, { PostType } from "./StartupCard";

async function getStartups(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/startups/userStartups/${id}`
    );

    const data = await res.json();
    return data.startups;
  } catch (error) {
    console.log(error);
  }
}

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await getStartups(id);
  console.log(startups[0]);
  return (
    <div>
      {startups.length > 0 ? (
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {startups.map((post: PostType) => (
            <li key={post._id} className="list-none">
              <StartupCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <h2>No Startus Found</h2>
      )}
    </div>
  );
};

export default UserStartups;

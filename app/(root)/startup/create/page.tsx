import StartupForm from "@/app/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");
  return (
    <div>
      <h1>Create Startup</h1>
      <StartupForm />
    </div>
  );
};

export default page;

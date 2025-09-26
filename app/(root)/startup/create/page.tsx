import StartupForm from "@/app/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");
  return (
    <div className="mt-[85px]">
      <StartupForm />
    </div>
  );
};

export default page;

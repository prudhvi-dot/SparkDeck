import Link from "next/link";
import { signIn, signOut, auth } from "@/auth";
import { LogOut } from "lucide-react";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white/10 shadow-sm font-work-sans fixed w-full top-0 z-50 backdrop-blur-md">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <img src="/Spark_Deck_Logo.png" width={154} height={154} alt="" />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden text-2xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Create
                </span>
              </Link>

              <Link href={`/user/${session.user.id}`}>
                <Image
                  src={session?.user?.image || ""}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="rounded-full drop-shadow-lg"
                />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden cursor-pointer text-2xl bg-gradient-to-l from-purple-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
                    Logout
                  </span>

                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("google");
              }}
            >
              <button type="submit">
                <span className="cursor-pointer text-2xl bg-gradient-to-l from-purple-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
                  Login
                </span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

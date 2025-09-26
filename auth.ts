
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import connectDB from "./lib/ConnectDB";
import Author from "./models/Author";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
  async signIn({ user }) {
    await connectDB();
    let existingUser = await Author.findOne({ email: user.email });
    if (!existingUser) {
      existingUser = await Author.create({
        name: user.name!,
        email: user.email!,
        image: user.image!,
      });
    }
    user.id = existingUser._id.toString();
    return true;
  },

  async jwt({ token, user }) {
    if (user?.id) {
      token.id = user.id;
    }
    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id as string;
    return session;
  },
}

})
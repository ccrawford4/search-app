import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login"
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      token.userRole = "user"; // Add the userRole to the token
      return token;
    },
  },
};
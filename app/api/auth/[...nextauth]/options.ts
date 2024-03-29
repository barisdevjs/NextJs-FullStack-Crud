import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { IUser } from "@/types/generalTypes";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";
import { RequestInternal } from "next-auth";

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        // console.log("Profile Github: ", profile);

        let userRole = "Github User";
        if (profile.email === "barissavas17@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          id: profile.id.toString(),
          role: userRole,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile) {
        // console.log("Profile Google: ", profile);

        let userRole = "Google User";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<IUser | null> {
        try {
          const foundUser = (await User.findOne({ email: credentials?.email })
            .lean()
            .exec()) as IUser | null;
          if (foundUser && foundUser.password) {
            console.log("User Exist");
            const match = await bcrypt.compare(
              credentials?.password as string,
              foundUser.password
            );
            if (match) {
              return foundUser as IUser;
            }
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    // async signIn(user, account, profile) {
    //   // Handle sign-in logic here
    //   return true; // Return true to allow sign-in
    // },
    // async redirect(url, baseUrl) {
    //   // Customize redirect logic here
    //   return baseUrl;
    // },

    // refactor the types for real types
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};

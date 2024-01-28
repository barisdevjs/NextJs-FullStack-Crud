import NextAuth from "next-auth/next"; // maybe just next-auth ??
import { options } from "./options";

const handler = NextAuth(options);
export { handler as GET1, handler as POST1 };
// They must be GET and POST so refactor below these   exports

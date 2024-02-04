import NextAuth from "next-auth"; // maybe just next-auth ??
import { options } from "./options";

const handler = NextAuth(options);
export { handler as GET, handler as POST };
// They must be GET and POST so refactor below these   exports

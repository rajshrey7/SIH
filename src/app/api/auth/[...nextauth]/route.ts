<<<<<<< HEAD
export { handlers as GET, handlers as POST } from "@/auth"
=======
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // your DB lookup here
        return { id: "1", email: credentials?.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
>>>>>>> d6a375d (Initial commit: Next.js + WebSocket + Auth setup)

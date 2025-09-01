<<<<<<< HEAD
export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*"], // protect dashboard
=======
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // protect only these
>>>>>>> d6a375d (Initial commit: Next.js + WebSocket + Auth setup)
};

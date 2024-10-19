export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",               // Protect the home page
    "/((?!api|login|logout|register|_next/static|_next/image|favicon.ico).*)",
  ],
};

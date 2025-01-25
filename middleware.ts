import { NextResponse } from "next/server";

export function middleware() {
  // const uid = req.cookies.get("re-up-command--uid")?.value;
  // const authorized = env.AUTHORIZED_ADMIN;

  // if (!uid) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // if (uid !== authorized) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path"],
};

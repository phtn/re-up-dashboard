import { env } from "@/env";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const uid = req.cookies.get("re-up-command--uid")?.value;
  const authorized = env.AUTHORIZED_ADMIN;

  if (!uid) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (uid !== authorized) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/secured", "/dashboard/:path"],
};

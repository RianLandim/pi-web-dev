import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL("/login", req.url);
  return NextResponse.redirect(url);
}

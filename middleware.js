import { NextResponse } from "next/server";
import { verifyToken } from "./lib/utils";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
    const PUBLIC_FILE = /\.(.*)$/;
    const token = req.cookies.get("token")?.value;
    const userId = await verifyToken(token);

    const { pathname } = req.nextUrl;

    // Exclude several paths
    if (
        pathname.includes("/api/login") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        PUBLIC_FILE.test(pathname)
    )
        return NextResponse.next();

    if (token && userId) {
        return NextResponse.next();
    }

    if (!token && pathname !== "/auth") {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
}

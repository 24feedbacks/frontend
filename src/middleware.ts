import { NextRequest, NextResponse } from "next/server";
import verifyJwt from "./security/verifyJwt";

export default function middleware(req: NextRequest) {
    const hasAuth = verifyJwt(req.cookies.get("userData"));

    if (!NextResponse.next())
        return NextResponse.redirect(new URL("/home", req.url));

    if (!hasAuth) return NextResponse.redirect(new URL("/login", req.url));
    else return NextResponse.redirect(new URL("/home", req.url));
}

export const config = {
    matcher: ["/"],
};

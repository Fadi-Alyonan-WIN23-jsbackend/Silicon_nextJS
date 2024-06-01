import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
    const cookie = cookies().get('Authorization');
    if (!cookie) {
        return NextResponse.redirect(new URL("/auth/signIn", request.url));
    }else {
        return NextResponse.redirect(new URL("/courses", request.url));
    }
    
}
export const config = {
    matcher: "//:path*"
}
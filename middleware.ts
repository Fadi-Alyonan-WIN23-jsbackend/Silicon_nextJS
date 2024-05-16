import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
    const cookie = cookies().get('Authorization');
    if (!cookie) {
        return NextResponse.redirect(new URL("/auth/signIn", request.url));
    } else {
        return NextResponse.next(); 
    }
}
export const config = {
    matcher: "/(courses|account)/:path*"
}
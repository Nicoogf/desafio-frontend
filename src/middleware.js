import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { TOKEN_SECRET } from "./config/config";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/account')) {
    const token = request.cookies.get("token")
    if (!token) {
      console.log("No hay token , Redireccion al Loguin")
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      const { payload } = await jwtVerify(token.value, new TextEncoder().encode(TOKEN_SECRET))
      console.log("Viene de middleware.js", payload)
      return NextResponse.next()
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

}
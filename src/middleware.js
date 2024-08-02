// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";
// import { TOKEN_SECRET } from "./config/config";

// export async function middleware(request) {
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     const token = request.cookies.get("token")
//     if (!token) {
//       console.log("No hay token , Redireccion al Loguin")
//       return NextResponse.redirect(new URL("/login", request.url))
//     }

//     try {
//       const { payload } = await jwtVerify(token.value, new TextEncoder().encode(TOKEN_SECRET))
//       return NextResponse.next()
//     } catch (error) {
      
//       return NextResponse.redirect(new URL("/login", request.url))
//     }
//   }

// }

import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { TOKEN_SECRET } from './config/config'

export async function middleware(request) {

  const token = request.cookies.get("token")

  if (request.nextUrl.pathname.includes("/dashboard") ) {
    if( token === undefined){
      console.log("No hay token fue redireccionado al loguin")
      return NextResponse.redirect(new URL("/login", request.url))
    }
    
    try {      
      const { payload } = await jwtVerify(token.value , new TextEncoder().encode(TOKEN_SECRET))
      console.log("Viene de middleware.js" , payload)
      return NextResponse.next()
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
  return NextResponse.next()
}


// import { NextResponse } from 'next/server'
// import { jwtVerify } from 'jose'
// import { TOKEN_SECRET } from './config/config'

// export async function middleware(request) {

//   const token = request.cookies.get("token")
//   if( token === undefined){
//     console.log("No hay token fue redireccionado al loguin")
//     return NextResponse.redirect(new URL("/login", request.url))
//   }


  
//   try {      
//     const { payload } = await jwtVerify(token.value , new TextEncoder().encode(TOKEN_SECRET))
//     console.log("Viene de middleware.js" , payload)
//     return NextResponse.next()
//   } catch (error) {
//     console.log(error)
//     return NextResponse.redirect(new URL("/login", request.url))
//   }

// }


// export const config = {
//   matcher: '/dashboard/:path*',
// }
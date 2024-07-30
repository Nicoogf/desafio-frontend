import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { TOKEN_SECRET } from "@/config/config";
import User from "@/models/User";

export async function GET ( request ) {
    MongoDBConnection()
    try {
        const userCookie = request.cookies.get("token")
        if(!token){
            return NextResponse.json(["Usuario no autenticado por falta de Token Valido"],{status:400})
        }
        const { value } = userCookie
        const { payload } = await jwtVerify( value , new TextDecoder().encode(TOKEN_SECRET))
        const { id } = payload

        const userFound = await User.findById(id)
        return NextResponse.json(userFound)
    } catch (error) {
        
    }
}
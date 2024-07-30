import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose"
import { TOKEN_SECRET } from "@/config/config";
import User from "@/models/User";

export async function GET ( request ) {
    MongoDBConnection ()
    try {
        const userCookie = request.cookies.get('token');

        if(!userCookie){
            return NextResponse.json(["No se encontro un Token"],{status:400})
        }

        const {payload} = await jwtVerify(userCookie.value , new TextEncoder().encode(TOKEN_SECRET))
        if(!payload.id) {
            return NextResponse.json(["El token generado no es valido en el sistema"],{status:400})
        }
        const { id } = payload

        const userFound = await User.findById(id)
        return NextResponse.json(userFound)
    } catch (error) {
        return NextResponse.json(error)
    }
}
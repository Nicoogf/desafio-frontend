import Movement from "@/models/Movement";
import { jwtVerify } from "jose";

import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";
import { TOKEN_SECRET } from "@/config/config";


export async function GET(request) {
    MongoDBConnection()
    const userCookie = request.cookies.get('token');
    if (!userCookie) {
        return NextResponse.json({ message: "El usuario no esta AUTENTICADO" }, { status: 401 });
    }
    const { value } = userCookie;
 

    const { payload } = await jwtVerify(value , new TextEncoder().encode(TOKEN_SECRET))


    const { id } = payload;

    const movimientos = await Movement.find({userId: id})

    return NextResponse.json( movimientos ) 
}
import Movement from "@/models/Movement";
import { jwtVerify } from "jose";


import { NextResponse } from "next/server";
import { TOKEN_SECRET } from "@/config/config";
import { MongoDBConnection } from "@/utils/mongodb";


export async function GET(request) {
    try {
        MongoDBConnection()
        const userCookie = request.cookies.get('token');
        if (!userCookie) {
            return NextResponse.json({ message: "El usuario no esta AUTENTICADO" }, { status: 401 });
        }
        const { value } = userCookie;
     
    
        const { payload } = await jwtVerify(value , new TextEncoder().encode(TOKEN_SECRET))
    
    
        
        const { id } = payload;
        console.log(id)
    
        const movimientos = await Movement.find({userId: id})
        console.log(movimientos)
        return NextResponse.json( movimientos ) 
       
    } catch (error) {
        return NextResponse.json(error)
    }
   
}
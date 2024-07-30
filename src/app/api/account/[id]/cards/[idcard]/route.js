import Card from "@/models/Card";
import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(request ,{ params }) {
    MongoDBConnection()
    try {
    const idUser = params.id 
    const idCard = params.idcard

    console.log("Usuario" , idUser, "Tarjeta" , idCard)

    const cardFound = await Card.findById(idCard)
    console.log(cardFound)
    if(!cardFound) {
        return NextResponse.json(["No se encontro tarjeta con ese ID "] , {status: 400})
    }
    return NextResponse.json(cardFound)
    } catch (error) {
        return NextResponse.json(error)
    } 
}
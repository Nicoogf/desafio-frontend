import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    MongoDBConnection()
    try {
        const id = params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(["ID inválido" ], { status: 400 });
        }

        const serviceFound = await User.findById(id)
    
        if (!serviceFound) {
            return NextResponse.json(["No se contro el servicio con ese numero ID"], { status: 400 })
        }       
    
        console.log(id)
        return NextResponse.json(serviceFound)
    } catch (error) {
        return NextResponse.json(error)
    }
}
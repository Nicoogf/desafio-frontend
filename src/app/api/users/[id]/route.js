import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/User";
import mongoose from "mongoose";


export async function GET ({ params }) {
    MongoDBConnection()
    const id = params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(["ID inválido" ], { status: 400 });
    }
    try {
        const userFound = await User.findById(id);
        if (!userFound) {
            return NextResponse.json(["Usuario Inexistente" ], { status: 404 });
        }
        return NextResponse.json(userFound);
    } catch (error) {
        return NextResponse.json([error.message ], { status: 500 });
    }
}

export async function PUT ({ params }) {
   
}
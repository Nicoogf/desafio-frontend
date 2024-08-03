import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongodb";

import { NextResponse } from "next/server";

export async function GET(){
    MongoDBConnection()
    try {
        const serviceList = await User.find({rol:"empresa"})
        return NextResponse.json(serviceList)
    } catch (error) {
        return NextResponse.json(error)
    }
}
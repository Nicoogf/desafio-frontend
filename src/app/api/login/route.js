import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST ( request ) {
 MongoDBConnection()
 const body = await request.json( request )
 return NextResponse.json( body )
}
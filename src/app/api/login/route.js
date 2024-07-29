import { NextResponse } from "next/server";

export default async function POST ( request ) {
 const body = await request.json( request )
 return NextResponse.json( body )
}
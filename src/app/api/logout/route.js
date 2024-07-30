import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function POST () {
    cookies().set('token', '')
    return NextResponse.json({message: "Usuario deslogueado"})
}
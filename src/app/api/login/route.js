import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import bycrypt from "bcryptjs";
import { validarEmail } from "@/utils/funcionalidades";
import { createAccesToken } from "@/utils/jwt";
import { cookies } from "next/headers";

export async function POST(request) {
    MongoDBConnection()
    try {
    const { email , password } = await request.json()
    console.log(email)

    if(!email || !password){
        return NextResponse.json(["Faltan ingresar credenciales"] , {status:400})
    }
    if (!validarEmail(email)) {
        return NextResponse.json(["El email ingresado no es valido"], { status: 400 })
      }
    
    const userFound = await User.findOne({email})

    console.log(userFound.cbu)

    if(!userFound){
        return NextResponse.json(["El usuario no se encuentra registrado"] , {status:400})
    }

    const isMatch = await bycrypt.compare( password ,userFound.password )

    if( !isMatch) {
        return NextResponse.json(["La contraseña es invalida"] , {status : 400 })
    }

    console.log(isMatch)

    const token = await createAccesToken({ id: userFound._id });

      // Establecer la cookie
      cookies().set("token", token, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'   
      }); 

      console.log(userFound.cbu)

      return NextResponse.json({
        id: userFound._id,
        name: userFound.name,
        lastname: userFound.lastname,
        email: userFound.email,
        dni: userFound.dni,
        rol: userFound.rol,
        dinero: userFound.dinero,
        phone: userFound.phone,
        cbu: userFound.cbu,
        alias: userFound.alias,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
        companyName: userFound.companyName,
        businessField: userFound.businessField,
        cuit: userFound.cuit
      })       
  
    } catch (error) {
        return NextResponse.json(error)
    }
}
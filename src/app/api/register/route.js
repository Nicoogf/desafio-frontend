import User from "@/models/User";
import { validarEmail } from "@/utils/funcionalidades";
import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import bycrypt from "bcryptjs" ;

export async function POST(request) {
    MongoDBConnection()
    const {
        name,
        lastname,
        email,
        dni,
        rol,
        phone,
        dinero,
        password,
        companyName,
        businessField,
        cuit,
        confirmPassword
    } = await request.json()

    const hashedPass = await bycrypt.hash( password , 12 )
    console.log(hashedPass)

    const newUserRegister = new User(
        {
            name,
            lastname,
            email,
            dni,
            rol,
            dinero,
            phone,
            password : hashedPass ,
            companyName,
            businessField,
            cuit: `20${cuit}7`,
        }
    )

    if (newUserRegister.rol === "usuario") {
        if (!name || !lastname || !email || !dni || !rol || !phone || !password) {
            return NextResponse.json(["Faltan completar Campos"], { status: 400 })
        }
    }

    if (newUserRegister.rol === "empresa") {
        if (!companyName || !businessField || !email || !cuit || !rol || !phone || !password) {
            return NextResponse.json(["Faltan completar Campos"], { status: 400 })
        }
    }

    if( password !== confirmPassword) {
        return NextResponse.json(["Las contraseñas ingresadas no coinciden"] , {status : 400})
    }

    if( !validarEmail(email) ){
        return NextResponse.json(["El email ingresado no es valido"] , {status : 400})
    }

    newUserRegister.save()

    return NextResponse.json({
        id: newUserRegister._id ,
        name: newUserRegister.name,
        lastname : newUserRegister.lastname,
        email: newUserRegister.email,
        dni: newUserRegister.dni,
        rol: newUserRegister.rol,
        dinero: newUserRegister.dinero,
        phone: newUserRegister.phone,
        cbu: newUserRegister.cbu,
        alias: newUserRegister.alias,
        createdAt: newUserRegister.createdAt,
        updatedAt: newUserRegister.updatedAt,
        companyName: newUserRegister.companyName,
        businessField :newUserRegister.businessField,
        cuit :newUserRegister.cuit
    })
}
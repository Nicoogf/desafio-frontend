import { MongoDBConnection } from "@/utils/mongodb";
import { createAccesToken } from "@/utils/jwt";
import { GenerarAlias, validarEmail } from "@/utils/funcionalidades";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bycrypt from "bcryptjs";
import User from "@/models/User";
import { palabras } from "@/utils/Diccionario";


export async function POST(request) {
  MongoDBConnection()

  try {
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

    const hashedPass = await bycrypt.hash(password, 12)

    const newUserRegister = new User(
      {
        name,
        lastname,
        email,
        dni,
        rol,
        dinero,
        alias: GenerarAlias(palabras) ,
        phone,
        password: hashedPass,
        companyName,
        businessField,
        cuit,
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

    const userFound = await User.findOne({ email })

    if (userFound) {
      return NextResponse.json(["El usuario ya se encuentra registrado"], { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json(["Las contraseñas ingresadas no coinciden"], { status: 400 })
    }

    if (!validarEmail(email)) {
      return NextResponse.json(["El email ingresado no es valido"], { status: 400 })
    }

    const validateAlias = await User.findOne({alias:newUserRegister.alias})

    if(validateAlias){
      const new_alias = GenerarAlias(palabras)
      newUserRegister.alias = new_alias
    }

    const token = await createAccesToken({ id: newUserRegister._id });

    cookies().set("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    newUserRegister.save()

    return NextResponse.json({
      id: newUserRegister._id,
      name: newUserRegister.name,
      lastname: newUserRegister.lastname,
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
      businessField: newUserRegister.businessField,
      cuit: newUserRegister.cuit
    },{status : 200 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 400 })
  }
}
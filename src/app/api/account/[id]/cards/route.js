import Card from "@/models/Card";
import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";


//Listado de tarjetas
export async function GET(request, { params }){
    MongoDBConnection()
    try {
        const id = params.id

        const userFound = await User.findById(id)
        if(!userFound){
            return NextResponse.json(["No se encontro usuario Logueado"], {status:400})
        }
    
        const listCard = await Card.find({user:id})
        console.log(listCard)
        return NextResponse.json(listCard)
    } catch (error) {
        return NextResponse.json(error)
    }
 
}

export async function POST(request ,{ params }) {
    try {
        MongoDBConnection();
        const id = params.id

        // Obtener datos de la solicitud
        const { name, codeSegurity, serial, vto, mount } = await request.json();
  
        // Verificar si la cookie de usuario está presente
        // const userCookie = request.cookies.get('token');
        // if (!userCookie) {
        //     return NextResponse.json({ message: "El usuario no está AUTENTICADO" }, { status: 401 });
        // }
  
        // Extraer el valor de la cookie y parsearlo
        // const { value } = userCookie;
        // const { payload } = await jwtVerify(value, new TextEncoder().encode(TOKEN_SECRET));
        // const { id } = payload;
  
        // Contar las tarjetas existentes para el usuario
        const cardCount = await Card.countDocuments({ user: id });
        if (cardCount >= 10) {
            return NextResponse.json([ "No se pueden agregar más de 10 tarjetas" ], { status: 400 });
        }
  
        // Crear una nueva tarjeta utilizando el ID del usuario
        const newCard = new Card({
            name,
            codeSegurity,
            serial,
            vto,
            mount,
            user: id
        });
  
        // Guardar la tarjeta en la base de datos
        const savedCard = await newCard.save();
  
        // Devolver la tarjeta guardada como respuesta
        return NextResponse.json(savedCard, { status: 201 });
    } catch (error) {
        // Manejar errores y devolver una respuesta de error adecuada
        console.error("Error al crear la tarjeta:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
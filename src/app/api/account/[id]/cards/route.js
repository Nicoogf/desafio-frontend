import Card from "@/models/Card";
import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { TOKEN_SECRET } from "@/config/config";
import { isCardExpired } from "@/utils/funcionalidades";


//Listado de tarjetas
export async function GET(request, { params }) {
    MongoDBConnection();
    try {
        const id = params.id;
        console.log( id )

        const userFound = await User.findById(id);
        if (!userFound) {
            return NextResponse.json({ error: "No se encontró usuario logueado" }, { status: 400 });
        }

        const listCard = await Card.find({ user: id });
        return NextResponse.json(listCard);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

//Crear Tarjeta
export async function POST(request ,{ params }) {
    try {
        MongoDBConnection();
        const idUser = params.id

        // Obtener datos de la solicitud
        const { name, codeSegurity, serial, vto, mount ,desc} = await request.json();
        console.log( name , codeSegurity ,serial ,vto  ,desc)

        if( !name || !codeSegurity || !serial ||  !vto  || !desc) {
            return NextResponse.json(["Faltan datos de la Tarjeta"] , {status:400})
        }

        if (isNaN(codeSegurity) || isNaN(serial) || isNaN(vto) ) {
            return NextResponse.json(["El codigo de seguridad , serial de la tarjeta  y el vencimiento deben ser números"], { status: 400 });
        }
  
        // Verificar si la cookie de usuario está presente
        const userCookie = request.cookies.get('token');
        if (!userCookie) {
            return NextResponse.json({ message: "El usuario no está AUTENTICADO" }, { status: 401 });
        }

  
     
        const { value } = userCookie;
        const { payload } = await jwtVerify(value, new TextEncoder().encode(TOKEN_SECRET));
        const { id } = payload;
  
        // Contar las tarjetas existentes para el usuario
        const cardCount = await Card.countDocuments({ user: idUser });
        if (cardCount >= 10) {
            return NextResponse.json([ "No se pueden agregar más de 10 tarjetas" ], { status: 400 });
        }

        if( isCardExpired(vto) ){
            return NextResponse.json(["La tarjeta esta vencida"],{status:400})
        }
  
        // Crear una nueva tarjeta utilizando el ID del usuario
        const newCard = new Card({
            name,
            codeSegurity,
            serial,
            vto,
            mount,
            user: idUser,
            desc
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
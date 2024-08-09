// import User from "@/models/User";
// import { MongoDBConnection } from "@/utils/mongodb";
// const { NextResponse } = require("next/server");

// export async function POST ( request ) {
//     const alias = await request.json()
//     console.log(alias)
//     MongoDBConnection()

//     try {      
//         const userFound = await User.findOne({alias})
    
//         if(!userFound){
//             return NextResponse.json(["No se encontro usuario"] , {status:400})
//         }
    
//         console.log(userFound.name) 
    
//         return NextResponse.json({
//             alias,
//             name: userFound.name,
//             lastname: userFound.lastname,
//             email: userFound.email
//         }) 
//     } catch (error) {
//         return NextResponse.json({error})
//     }
   
// }

import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongodb";
const { NextResponse } = require("next/server");

export async function POST(request) {
    try {
        const { alias } = await request.json();
        console.log(alias);

        MongoDBConnection();

        const userFound = await User.findOne({ alias });

        if (!userFound) {
            console.log("Entro aca")
            return NextResponse.json(["No se encontró usuario"], { status: 400 });
        }

        console.log(userFound.name);

        return NextResponse.json({
            alias,
            name: userFound.name,
            lastname: userFound.lastname,
            email: userFound.email
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
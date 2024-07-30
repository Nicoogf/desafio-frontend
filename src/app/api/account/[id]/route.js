import User from "@/models/User"
import { MongoDBConnection } from "@/utils/mongodb"
import { NextResponse } from "next/server"


//Update only the alias of the account.
//Actualiza el alias

export async function PATCH (request , { params }) {
   
    MongoDBConnection()
    try {
        const id = params.id
      
        const { newAlias } = await request.json()
        console.log(newAlias)
    
        const userFound = await User.findById(id)
        if(!userFound){
            return NextResponse.json(["El usuario no existe"] , {status : 400 })
        }
  
        userFound.alias = newAlias
        await userFound.save()

    
        return NextResponse.json(userFound)
    } catch (error) {
        return NextResponse.json(error)
    }
}
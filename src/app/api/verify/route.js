import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "@/config/config";
import User from "@/models/User"

export async function GET(request) {

const token = request.cookies.get("token");
 

  if (!token) return NextResponse.json({ message: "no autorizado" }, { status: 400 });

  try {
    const user = jwt.verify(token.value, TOKEN_SECRET);  

    const userFound = await User.findById(user.id);
    if (!userFound) return NextResponse.json({ message: "No autorizado" }, { status: 400 });

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
    });
  } catch (error) {
    return NextResponse.json({ message: "No autorizado" }, { status: 400 });
  }
}



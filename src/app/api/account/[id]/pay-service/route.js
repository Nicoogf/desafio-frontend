import { MongoDBConnection } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Card from "@/models/Card";
import Movement from "@/models/Movement";
import { TransactionType } from "@/utils/enum";

export async function POST(request) {
    MongoDBConnection();
    try {
        const { empresa_id, paymentMethod, amount, userlastname, username, user_id } = await request.json();
        console.log(paymentMethod);

        const userFound = await User.findById(empresa_id);

        if (!userFound) {
            return NextResponse.json({ message: "El usuario no está registrado" }, { status: 404 });
        }

        const transValue = parseFloat(amount);
        console.log(transValue);

        if (paymentMethod.startsWith('card')) {
            const cardId = paymentMethod.split('-')[1];
            const cardFound = await Card.findById(cardId);

            if (!cardFound) {
                return NextResponse.json({ message: "No se encontró la tarjeta" }, { status: 404 });
            }

            if (cardFound.mount < transValue) {
                return NextResponse.json({ message: "No tienes suficiente dinero en la tarjeta" }, { status: 400 });
            }

            cardFound.mount -= transValue;
            await cardFound.save();
        } else if (paymentMethod.startsWith('cash')) {
            const userId = paymentMethod.split('-')[1];
            const user = await User.findById(userId);

            if (!user || user.dinero < transValue) {
                return NextResponse.json({ message: "No tienes suficiente dinero en la cuenta" }, { status: 400 });
            }

            user.dinero -= transValue;
            await user.save();
        } else {
            return NextResponse.json({ message: "Método de pago no válido" }, { status: 400 });
        }

        userFound.dinero += transValue;
        await userFound.save();

        const depositMovement = new Movement({
            userId: userFound._id,
            amount: transValue,
            type: TransactionType.PAYMENT_RECEIVED,
            details: `Pago recibido del cliente ${username} ${userlastname}`
        });
        await depositMovement.save();

        const paymentMovement = new Movement({
            userId: user_id,
            amount: transValue,
            type: TransactionType.PAYMENT_SENT,
            details: `Pago de Servicio ${userFound.companyName}`
        });
        await paymentMovement.save();

        console.log(paymentMovement.details);

        return NextResponse.json({ message: "Pago exitoso" }, { status: 200 });

    } catch (error) {
        console.error("Error en el proceso de pago:", error);
        return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 });
    }
}

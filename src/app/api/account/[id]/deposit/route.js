// import { NextResponse } from "next/server";

// import { PDFDocument, rgb } from 'pdf-lib';
// import fs from 'fs';
// import path from 'path';
// import { TransactionType } from "@/utils/enum";
// import { lastFourNumbers } from "@/utils/funcionalidades";
// import { MongoDBConnection } from "@/utils/mongodb";
// import Card from "@/models/Card";
// import User from "@/models/User";
// import Movement from "@/models/Movement";

// export async function POST(request) {
//     try {
//         const { email, amount, card } = await request.json();

//         const trans_value = parseInt(amount);

//         MongoDBConnection();
//         const userFound = await User.findOne({ email });

//         if (!userFound) {
//             return NextResponse.json({ message: "El usuario no está registrado" }, { status: 400 });
//         }

//         const cardFound = await Card.findById(card);

//         if (!cardFound) {
//             return NextResponse.json({ message: "No se encontró la tarjeta" }, { status: 400 });
//         }

//         if (cardFound.mount < amount) {
//             return NextResponse.json({ message: "No tienes suficiente dinero en la tarjeta" }, { status: 400 });
//         }

//         cardFound.mount -= trans_value;
//         userFound.dinero += trans_value;

//         await cardFound.save();
//         await userFound.save();

//         const depositMovement = new Movement({
//             userId: userFound._id,
//             amount: trans_value,
//             type: TransactionType.DEPOSIT_COMPLETED,
//             details: `Depósito desde tarjeta ${lastFourNumbers(cardFound.serial)}`
//         });

//         await depositMovement.save();

//         // Crear el documento PDF
//         const pdfDoc = await PDFDocument.create();
//         const page = pdfDoc.addPage([640, 480]);
//         const { height } = page.getSize();
//         const fontSize = 12;

//         page.drawText(`Depósito realizado con éxito`, { x: 50, y: height - 4 * fontSize, size: fontSize + 4, color: rgb(0, 0, 0) });
//         page.drawText(`Desde tarjeta: ${lastFourNumbers(cardFound.serial)}`, { x: 50, y: height - 6 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
//         page.drawText(`Monto: $ ${trans_value}`, { x: 50, y: height - 8 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
//         page.drawText(`Fecha: ${new Date().toLocaleString()}`, { x: 50, y: height - 10 * fontSize, size: fontSize, color: rgb(0, 0, 0) });

//         const pdfBytes = await pdfDoc.save();

//         // Guardar el archivo PDF en el sistema de archivos (asegúrate de que la carpeta exista)
//         const pdfPath = path.join(process.cwd(), 'public', 'pdfs', `${Date.now()}_deposit.pdf`);
//         fs.writeFileSync(pdfPath, pdfBytes);

//         return NextResponse.json({
//             message: "Depósito satisfactorio",
//             pdfUrl: `/pdfs/${path.basename(pdfPath)}`,
//             card: cardFound.serial,
//             amount,
//             user: `${userFound.name} ${userFound.lastname}`
//         });
//     } catch (error) {
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }


import { NextResponse } from "next/server";
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { TransactionType } from "@/utils/enum";
import { lastFourNumbers } from "@/utils/funcionalidades";
import { MongoDBConnection } from "@/utils/mongodb";
import Card from "@/models/Card";
import User from "@/models/User";
import Movement from "@/models/Movement";

export async function POST(request) {
    try {
        const { email, amount, card } = await request.json();


        const trans_value = parseInt(amount);

        MongoDBConnection();
        const userFound = await User.findOne({ email });

    

        if (!userFound) {
            return NextResponse.json(["El usuario no está registrado"], { status: 400 });
        }

        const cardFound = await Card.findById(card);

        console.log('Card found:', cardFound);  

        if (!cardFound) {
            return NextResponse.json([ "No se encontró la tarjeta"], { status: 400 });
        }

        if (cardFound.mount < amount) {
            return NextResponse.json([ "No tienes suficiente dinero en la tarjeta" ], { status: 400 });
        }

        cardFound.mount -= trans_value;
        userFound.dinero += trans_value;

        await cardFound.save();
        await userFound.save();

        const depositMovement = new Movement({
            userId: userFound._id,
            amount: trans_value,
            type: TransactionType.DEPOSIT_COMPLETED,
            details: `Depósito desde tarjeta ${lastFourNumbers(cardFound.serial)}`
        });

        await depositMovement.save();

        // Crear el documento PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([640, 480]);
        const { height } = page.getSize();
        const fontSize = 12;

        page.drawText(`Depósito realizado con éxito`, { x: 50, y: height - 4 * fontSize, size: fontSize + 4, color: rgb(0, 0, 0) });
        page.drawText(`Desde tarjeta: ${lastFourNumbers(cardFound.serial)}`, { x: 50, y: height - 6 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Monto: $ ${trans_value}`, { x: 50, y: height - 8 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Fecha: ${new Date().toLocaleString()}`, { x: 50, y: height - 10 * fontSize, size: fontSize, color: rgb(0, 0, 0) });

        const pdfBytes = await pdfDoc.save();

        // Verificar y crear la carpeta si no existe
        const pdfDir = path.join(process.cwd(), 'public', 'pdfs');
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        // Guardar el archivo PDF en el sistema de archivos
        const pdfPath = path.join(pdfDir, `${Date.now()}_deposit.pdf`);
        fs.writeFileSync(pdfPath, pdfBytes);

        return NextResponse.json({
            message: "Depósito satisfactorio",
            pdfUrl: `/pdfs/${path.basename(pdfPath)}`,
            card: cardFound.serial,
            amount,
            user: `${userFound.name} ${userFound.lastname}`,
            type: TransactionType.DEPOSIT_COMPLETED
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

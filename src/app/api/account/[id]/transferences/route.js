import Movement from "@/models/Movement";
import User from "@/models/User";
import { TransactionType } from "@/utils/enum";
import { NextResponse } from "next/server";
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { MongoDBConnection } from "@/utils/mongodb";

export async function POST(request) {
  try {
    MongoDBConnection();
    const { alias, amount, email } = await request.json();
    const trans_value = parseInt(amount);
    console.log(alias,amount,email)

    const userSender = await User.findOne({ email });
    if (!userSender) {
      return NextResponse.json({ message: "No hay cliente registrado" }, { status: 400 });
    }

    const userReceiver = await User.findOne({ alias });
    if (!userReceiver) {
      return NextResponse.json({ message: "No se encontró destinatario" }, { status: 400 });
    }

    if (userSender.dinero < amount) {
      return NextResponse.json(["No tienes suficiente dinero"] , { status: 400 });
    }

    userSender.dinero -= trans_value;
    userReceiver.dinero += trans_value;

    await userSender.save();
    await userReceiver.save();

    const senderMovement = new Movement({
      userId: userSender._id.toString(),
      type: TransactionType.TRANSFER_SENT,
      amount: trans_value,
      details: `Transferencia a ${userReceiver.name}`
    });
    await senderMovement.save();

    const receiverMovement = new Movement({
      userId: userReceiver._id.toString(),
      type: TransactionType.TRANSFER_RECEIVED,
      amount: trans_value,
      details: `Recepción de ${userSender.name}`
    });
    await receiverMovement.save();

    // Crear el documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([640, 480]);
    const { height } = page.getSize();
    const fontSize = 12;

    page.drawText(`Transacción realizada con exito`, { x: 50, y: height - 4 * fontSize, size: fontSize + 4, color: rgb(0, 0, 0) });
    page.drawText(`Detalles : `, { x: 50, y: height - 4 * fontSize, size: fontSize + 4, color: rgb(0, 0, 0) });
    page.drawText(`De: ${userSender.name} ${userSender.lastname} (${userSender.email})`, { x: 50, y: height - 6 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`A: ${userReceiver.name} ${userReceiver.lastname} (${userReceiver.alias})`, { x: 50, y: height - 8 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`Monto: $ ${trans_value}`, { x: 50, y: height - 10 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`Fecha: ${new Date().toLocaleString()}`, { x: 50, y: height - 12 * fontSize, size: fontSize, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();

    // Guardar el archivo PDF en el sistema de archivos (asegúrate de que la carpeta exista)
    const pdfPath = path.join(process.cwd(), 'public', 'pdfs', `${Date.now()}_transaction.pdf`);
    fs.writeFileSync(pdfPath, pdfBytes);

    return NextResponse.json({
      message: "Envio de dinero Satisfactorio",
      pdfUrl: `/pdfs/${path.basename(pdfPath)}`,
      alias,
      amount,
      email,
      sender : `${userSender.name} ${userSender.lastname}`,
      reciber : `${userReceiver.name} ${userReceiver.lastname}`
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
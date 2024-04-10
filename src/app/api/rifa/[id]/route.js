import { db } from "@/app/firebase/config";
import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try {
        const productRef = doc(db, 'rifa', params.id); // Referencia al documento del producto por su ID
        const a = await getDoc(productRef);
        if (a.exists()) {
            const data = {
                id: a.id,
                data: a.data()
            };
            return NextResponse.json(data);
        } else {
            console.log("El documento no existe");
            return NextResponse.json({ error: "El documento no existe" });
        }
    } catch (error) {
        console.error("Error al obtener el documento:", error);
        return NextResponse.error("Error al obtener el documento");
    }
    
}

export async function PUT(request, {params}){
    try{const data = await request.json(); // el body o sea el data, contiene la información del usuario
    let currentDate = new Date();
    await updateDoc(doc(db, "rifa", params.id), {
        taken: true,
        dateTaken: Timestamp.fromDate(currentDate),
        takenBy: {
            userID: data.id,
            userName: data.mail,
        }
      });
      revalidatePath("/rifa")
    return NextResponse.json("Obteniendo tareaa " + params.id)}
    catch (error) {
        console.error("Error al obtener el documento:", error);
        return NextResponse.error("Error al obtener el documento");
    }
}


export async function DELETE(request, {params}){
    await deleteDoc(doc(db, "productos", params.id));
    return NextResponse.json("Delete " + params.id)
}
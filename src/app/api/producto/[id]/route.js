import { db } from "@/app/firebase/config";
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try {
        const productRef = doc(db, 'productos', params.id); // Referencia al documento del producto por su ID
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
    const data = await request.json();
    console.log(data)
    await updateDoc(doc(db, "productos", params.id), {
        nombre: data.nombre,
      });
    return NextResponse.json("Obteniendo tareaa " + params.id)
}


export async function DELETE(request, {params}){
    await deleteDoc(doc(db, "productos", params.id));
    return NextResponse.json("Delete " + params.id)
}
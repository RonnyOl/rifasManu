import { db } from "@/app/firebase/config";
import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    try {
        console.log("----------")
        const productRef = doc(db, 'usuarios', params.id); // Referencia al documento del producto por su ID
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
    const wa = await request.json();
    console.log("------------------------------>", params)
    const productRef = doc(db, 'usuarios', params.id); // Referencia al documento del producto por su ID
        const a = await getDoc(productRef);
        if (a.exists()) {
            const data = {
                id: a.id,
                data: a.data()
            }
            const result = (data.data.coins - 200)
                if (result < 0 ){
                    
                    return NextResponse.json({success: false}, {error: "ERROR: NO TIENES PLATA"})
                    
                }else{
                console.log("------------------------------------------------------------------------------------------")
                await updateDoc(doc(db, "usuarios", params.id), {
                coins: Number(result)
              });}
              console.log("asdsadasd")
            return NextResponse.json({success: true, message: "Se hizo"})
        }
        else
        {
            return NextResponse.json({success: false}, {error: "No se hizo"})
        }
}

export async function POST(request, {params}){
    const wa = await request.json();
    console.log("------------------------------>", params.id)
    console.log("------------------------------>", wa.pago)
    const productRef = doc(db, 'usuarios', params.id); // Referencia al documento del producto por su ID
        const a = await getDoc(productRef);
        if (a.exists()) {
            const data = {
                id: a.id,
                data: a.data()
            }
                console.log("------------------------------------------------------------------------------------------")
                await updateDoc(doc(db, "usuarios", params.id), {
                coins: Number(data.data.coins+wa.pago)
              })
              return NextResponse.json({success: true, message: "Se hizo"})
            }else{
                return NextResponse.json({success: false, message: "no se hizo"})
            }
            return NextResponse.json({success: false, message: "error acá"})
    }
        



export async function DELETE(request, {params}){
    await deleteDoc(doc(db, "productos", params.id));
    return NextResponse.json("Delete " + params.id)
}
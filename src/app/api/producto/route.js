import { db } from "@/app/firebase/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request){
    try {const productos = await getDocs(collection(db, "productos"));
    const a = productos.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
    }));
    
    console.log(a)
    return NextResponse.json(a)}
    catch (error) {
        return NextResponse.json({message: error.message},{status:500,})
    }
}

export async function POST(request){
    
    const body = await request.json()
    console.log(body)
    await addDoc(collection(db, "productos"), {
        nombre: body.title
      });

    
    return NextResponse.json("Funciona")
}
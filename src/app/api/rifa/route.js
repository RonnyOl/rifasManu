import { db } from "@/app/firebase/config";
import { Timestamp, addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
//getea TODAS LAS RIFAS


export async function GET(request, {params}){
    try {
    const productos = await getDocs(collection(db, "rifa"));
    const a = productos.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
    }));
    
    return NextResponse.json(a)}
    catch (error) {
        return NextResponse.json({message: error.message},{status:500,})
    }
}


//POSTEA TODAS LAS RIFAS VACIAS
export async function POST(request){
    
        const body = await request.json()
        console.log(body)
        let max = Number(body)
        console.log(max)
        
    for (let i = 0; i<50;i++ ){

        let currentDate = new Date();
       
        let docData = {
            name: `Esta es la casilla ${i+1}`,
            dateCreate: Timestamp.fromDate(currentDate),
            taken: false,
            dateTaken: null,
            id: i+1
            }

        await setDoc(doc(db, "rifa", `${i+1}`), docData)
    }
    
    return NextResponse.json("Rifa Creada")
}

export async function DELETE(request){
    await getDocs(db.collection("rifa"))
    .get()
    .then(res => {
      res.forEach(element => {
        element.ref.delete();
      });
    });
    return NextResponse.json("Delete " + params.id)
}
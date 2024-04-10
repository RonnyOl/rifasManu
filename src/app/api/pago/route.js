import { db } from "@/app/firebase/config";
import { Timestamp, addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
//getea TODAS LAS RIFAS


export async function GET(request){
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
        console.log(body.payment.payer, "<---------------------------------------")

        const res = await fetch(process.env.URL+"/api/usuarios/"+`${body.uid}`, {
            method: "GET"
          })
          const data = await res.json()
          console.log(data)
        let currentDate = new Date();
       
        let docData = {
            payer: {
                payer_email: data.id,
                payer_uid: data.data.id,
                payer_dni: body.payment.payer.identification.number,
                // payer_phone: data.payment.payer.phone.number,
                // payer_name: data.payment.payer.first_name,
                payer_lastname: body.payment.payer.last_name,
            },
            dateCreate: Timestamp.fromDate(currentDate),
            charge_amount: body.payment.transaction_amount,
            pay_status: body.payment.status
            }

        await addDoc(collection(db, "pagos"), docData);
    
    
    return NextResponse.json("pago hecho")
}

export async function DELETE(request){

    return NextResponse.json("Delete " + params.id)
}
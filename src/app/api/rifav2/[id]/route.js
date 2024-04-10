import { db } from "@/app/firebase/config";
import { Timestamp, addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { NextResponse } from "next/server";


//getea LAS RIFAS QUE SON DEL USUARIOOO
export async function GET(request, {params}){
    try {
        console.log(params.id)
        const querySnapshot = await getDocs(query(collection(db, "rifa"), where("takenBy.userID", "==", params.id)));
        const rifas = querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        
        return NextResponse.json(rifas);
    } catch (error) {
        console.error("Error al obtener las rifas:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

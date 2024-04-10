import { auth, db } from "@/app/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
}

export async function POST(request, {params}){
    console.log(request)
    try {
        const body = await request.json();
        const email = `${body.email}`
        const password = `${body.password}`
        console.log(body.email)
        console.log("saaaaaaa")
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log("hola")
        // await setDoc(doc(db, `usuarios/${res.user.uid}`),{ rol: "user", id: res.user.uid, coins: 0 });
        await setDoc(doc(db, "usuarios", `${res.user.email}`),
        {
            rol: "user",
            email: res.user.email,
            id: res.user.uid,
            coins: 0 
        });
        return NextResponse.json({succes: true})
        
    } catch (error) {
        console.log("aca")
        return NextResponse.json({succes: false, error: true})
    }
}


export async function DELETE(request, {params}){
    await deleteDoc(doc(db, "productos", params.id));
    return NextResponse.json("Delete " + params.id)
}
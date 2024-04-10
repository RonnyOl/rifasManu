import { auth } from "@/app/firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import {serialize}  from "cookie";
import { cookies } from "next/headers";

export async function POST(request, response){
    
    try {
        const b = cookies().get("authToken");
        const bA = cookies().get("authTokenA");
        console.log("----");
        let serialized = null; // Definimos serialized aquí para que esté disponible en todo el bloque try
    
        if (b) {
            console.log("test");
            const user = jwt.verify(b.value, "secret");
    
            serialized = serialize("authToken", null, {
                httpOnly: true,
                maxAge: 0,
                path: "/"
            });
        }
        
        let serializedA = null; // Definimos serializedA aquí para que esté disponible en todo el bloque try
    
        if (bA) {
            const userA = jwt.verify(bA.value, "secretAdm");
            
            serializedA = serialize("authTokenA", null, {
                httpOnly: true,
                maxAge: 0,
                path: "/"
            });
        }
    
        if (bA && b) {
            console.log("");
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Set-Cookie': [serialized, serializedA] },
            });
        } else if (bA) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Set-Cookie':  serializedA },
            });
        } else if (b) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Set-Cookie': serialized },
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: true });
    }

}
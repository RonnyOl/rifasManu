import { auth } from "@/app/firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import {serialize}  from "cookie";
import { cookies } from "next/headers";

export async function GET(request, response){
    try{
    const b = cookies().get("authToken")
     if (b)
        {
            
            const user = jwt.verify(b.value, "secret")
            // console.log(user) esta es la información de cada usuario
            return NextResponse.json({user, success: true})
        }
        return NextResponse.json("No se encontró nada")
    }catch{
        return NextResponse.json("ERROR: NO SÉ")
    }
    
}

export async function POST(request, response){
    
    try {
        const body = await request.json();
        const email = `${body.email}`
        const password = `${body.password}`

        // Autenticación con Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Obtener el usuario autenticado
        const currentUser = getAuth().currentUser;
     
        const res = await fetch(process.env.URL+"/api/usuarios/"+currentUser.email,  {method: "GET"})
        const data = await res.json()
        console.log(data)

        // Generar token JWT
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            currentUser: currentUser
        }, 'secret')
        
        // console.log(token)
        // Serializar el token en una cookie
        const serialized = serialize("authToken", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/"
        });

        if (data.data.rol == "admin"){
            const tokenAdm = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                currentUser: currentUser
            }, 'secretAdm')
            
            // console.log(token)
            // Serializar el token en una cookie
            const serializedAdm = serialize("authTokenA", tokenAdm, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30,
                path: "/"
            });

            return new Response(JSON.stringify({ serialized, success: true}), {
                status: 200,
                headers: { 'Set-Cookie': [serialized, serializedAdm]},
              })
        }
        
    
        // Retornar una respuesta JSON
        console.log("-----------------------")
        // cookies().set("Set-Cookie", serialized, {httpOnly: true}) <<---- otra opción
        return new Response(JSON.stringify({ serialized, success: true}), {
            status: 200,
            headers: { 'Set-Cookie': serialized},
          });

    } catch (error) {
        console.error("Errror: ", error);
        return NextResponse.json({success: false, error: true});
    }

}
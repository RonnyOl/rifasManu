
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export  async function middleware(request){
    
    // console.log(request.nextUrl.pathname)
    
    if (request.nextUrl.pathname == "/login" || request.nextUrl.pathname == "/registrar") {
        const jwt = request.cookies.get("authToken")
        
        try{
            const {payload} = await jwtVerify(jwt.value, new TextEncoder().encode("secret") )
            console.log(payload)
            return NextResponse.redirect(new URL("/rifa", request.url))
        }catch(error){
            console.log(error)
        }
        
    }

    if (request.nextUrl.pathname == "/crear" ) {
        const jwtA = request.cookies.get("authTokenA")
            if(jwtA == undefined){
                return NextResponse.redirect(new URL("/rifa", request.url))
            }

        try{
            const {payload} = await jwtVerify(jwtA.value, new TextEncoder().encode("secretAdm") )
            console.log(payload)
            
        }catch(error){
            console.log(error)
            return NextResponse.redirect(new URL("/rifa", request.url))
        }
        
    }

    // if (request.nextUrl.pathname == "/crear") {
    //     const jwt = request.cookies.get("authToken")
    //     try {
    //         const {payload} = await jwtVerify(jwt.value, new TextEncoder().encode("secret") )
    //         console.log(payload.currentUser.email)
    //         const data = await fetch("/api/usuarios/"+payload.currentUser.email, {method: "GET"})
    //         console.log("AAAAAAAAAAAAAAAA--AAAA")
    //         if (data.data){
    //             console.log("holaa")
    //         }
    //     }catch(error){
    //         console.log(error)
    //     }
    return NextResponse.next()

   

    
}
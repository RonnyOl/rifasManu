import { headers } from "next/headers";
import { NextResponse } from "next/server";

export function GET(req, params) {
    const headersList = headers()
    const referer = headersList.get('apikey')
    console.log(headersList)
    console.log(process.env.APIKEY)
   console.log(referer)
    if (process.env.APIKEY != referer) {
        return NextResponse.json({"hola": "parguela"})
    }
    return NextResponse.json({"hola": "hola"})
}

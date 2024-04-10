import { MercadoPagoConfig, Preference } from "mercadopago";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });
export async function POST(req,res) {
    try{
        const body = await req.json()
        const cantidad = body.cantidad
        const uid = body.uid

        const preference = await new Preference(client).create({
            body: {
                
              items: [
                {
                  id: "donacion",
                  title: "hola",
                  picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                  quantity: cantidad,
                  unit_price: 200,
                  
                },
              ],
              payer: {
                name: "Juan",
                surname: "Perez",
                email: "user@gmail.com",
              },
              back_urls: {
                  success: "http://localhost:3000/main",
                  failure: "http://localhost:3000/main",
                  pending: "http://localhost:3000/main",
              },
              auto_return: "approved",
              external_reference: uid,
            }
          });

        console.log(preference.id)

    return NextResponse.json({status:200, preferenceId: preference.id})
}catch(error){
    console.log(error)
   }
    
}
import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";


const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

export async function POST(request) {
    
    const body = await request.json().then({data: {id: ""}})

    const payment = await new Payment(client).get({
        id: body.data.id
    }).then()
    
    if (payment.status == "approved" && payment.status_detail == "accredited"){
       
        console.log(payment.external_reference)
        console.log(process.env.URL+"/api/usuarios/"+`${payment.external_reference}`)
       const res = await fetch(process.env.URL+"/api/usuarios/"+`${payment.external_reference}`, {
            method: "POST",
            body: JSON.stringify({pago: Number(payment.transaction_amount)})
          })
          const data = await res.json()
         if(data.success){
            const res = await fetch(process.env.URL+"/api/pago/", {
                method: "POST",
                body: JSON.stringify({uid: payment.external_reference, payment: payment})
              })
              const data = await res.json()
         }
        return NextResponse.json({ succes: true }, {status: 200})
    }else{
        return NextResponse.json({ succes: false }, {status: 500})
    }
    // 5031 7557 3453 0604
}

export async function GET(request) {

    return NextResponse.json({ succes: true })
}
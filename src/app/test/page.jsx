
import React from "react";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
export default function Page({cantidad}) {
    async function donate(form) {
        "use server";
        
        const preference = await new Preference(client).create({
          body: {
            items: [
              {
                id: "donacion",
                title: "hola",
                quantity: 1,
                unit_price: 200,
              },
            ],
            back_urls: {
                success: "http://localhost:3000/main",
                failure: "http://localhost:3000/main",
                pending: "http://localhost:3000/main",
            },
            auto_return: "approved",
          }
        });
    
        redirect(preference.sandbox_init_point);
    }

    donate()

  return (
    <section className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
      
      
    </section>
  );
}

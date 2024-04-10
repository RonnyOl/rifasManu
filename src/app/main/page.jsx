
import React from "react";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
export default function Page() {
    async function donate(form) {
        "use server";
        
        const preference = await new Preference(client).create({
          body: {
            items: [
              {
                id: "donacion",
                title: "hola",
                quantity: form.get(),
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

  return (
    <section className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
      <header className="text-xl font-bold leading-[4rem]">stream-donancy</header>
      <main className="py-8">
        <section className="grid gap-12">
          <form action={donate} className="m-auto grid max-w-96 gap-8 border p-4">
          <div className="flex justify-center items-center gap-1"><input name="xd" value={10} type="radio" /> 1</div>
          <div className="flex justify-center items-center gap-1"><input name="xd" value={5} type="radio" /> 5</div>
          <div className="flex justify-center items-center gap-1"><input name="xd" value={10} type="radio" /> 10</div>
          <button type="submit">Enviar</button>
          
        </form>
        </section>
      </main>
      
    </section>
  );
}

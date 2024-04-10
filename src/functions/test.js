"use server"
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });
export default async function test(cant) {

        console.log(cant)
    const preference = await new Preference(client).create({
        body: {
          items: [
            {
              id: "donacion",
              title: "hola",
              quantity: cant,
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

    return {

  }
}

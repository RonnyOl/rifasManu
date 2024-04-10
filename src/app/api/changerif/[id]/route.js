import { db } from "@/app/firebase/config";
import { Timestamp, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const productRef = doc(db, 'rifa', params.id); // Referencia al documento del producto por su ID
        const a = await getDoc(productRef);
        if (a.exists()) {
            const data = {
                id: a.id,
                data: a.data()
            };
            return NextResponse.json(data);
        } else {
            console.log("El documento no existe");
            return NextResponse.json({ error: "El documento no existe" });
        }
    } catch (error) {
        console.error("Error al obtener el documento:", error);
        return NextResponse.error("Error al obtener el documento");
    }

}

export async function PUT(request, { params }) {

    try {

        console.log("<---------------")
        const body = await request.json()
        console.log(body)
        console.log(params)
        console.log(body.user.email)
        const idUser = params.id

        const res = await fetch(process.env.URL + "/api/usuarios/" + idUser, { method: "GET" })
        const data = await res.json()

        if (data) {
            const res2 = await fetch(process.env.URL + "/api/usuarios/" + idUser, { method: "PUT", body: JSON.stringify("") })
            const data2 = await res2.json()
            
            if (data2.success == false) {
                return NextResponse.json({success:false, error: "Saldo Insuficiente"})
            }
            
            console.log(body.idSelect)
            let take = null
            const rifaRef = doc(db, "rifa", body.idSelect);

            const rifaDoc = await getDoc(rifaRef);
            console.log("ACA")

            if (rifaDoc.exists()) {
                const rifaData = rifaDoc.data();
                if (rifaData.taken) {
                    take = true
                    console.log(`La rifa con ID ${body.idSelect} está tomada.`);
                } else {
                    take = false
                    console.log(`La rifa con ID ${body.idSelect} no está tomada.`);
                }
            }

            if (take == true){
                return NextResponse.json({success: false, error: "Ya está tomado"})
            }

            if (data2.success == true && take == false) {
                let currentDate = new Date();
                await updateDoc(doc(db, "rifa", body.idSelect), {
                    taken: true,
                    dateTaken: Timestamp.fromDate(currentDate),
                    takenBy: {
                        userID: body.user.uid,
                        userName: body.user.email,
                    }
                })
                return NextResponse.json({success: true})
            }
            
        } else { return NextResponse.json("No se consiguió al usuario con ID: " + params.id) }
        return NextResponse.json("nada" + params.id)
    }
    catch (error) {
        console.error("Error al obtener el documento:", error);
        return NextResponse.error("Error al obtener el documento");
    }
}


export async function DELETE(request, { params }) {
    await deleteDoc(doc(db, "productos", params.id));
    return NextResponse.json("Delete " + params.id)
}
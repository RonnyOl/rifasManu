"use client"
import React, { useEffect, useState } from 'react'
import PopUp from './PopUp'
import { useRouter } from 'next/navigation'


export default function CompraMenu({showCompra, idSelect, user}) {
    const router = useRouter()
    const [popUpDone, setpopUpDone] = useState("")
    const [loading, setloading] = useState(false)
    const [buyDone, setbuyDone] = useState(false)
    const [error, seterror] = useState("")

    const fetching = async (idSelect) => {
        setloading(true);
        const res = await fetch("/api/changerif/"+user.email,  {method: "PUT",body: JSON.stringify({user, idSelect})})
        const data = await res.json()
        console.log("--------------->", data)
        setloading(false);
        if (data.success == true){
            setpopUpDone("true");
            setTimeout(() => {
                location.reload()
            }, 5000);
        } else if (data.success == false && data.error == "Saldo Insuficiente"){
            setpopUpDone("false");
            seterror(data.error)
            setTimeout(() => {
                location.reload()
            }, 5000);
        }else{
            setpopUpDone("false");
            seterror(data.error)
            setTimeout(() => {
                location.reload()
            }, 5000);
        }
    }

    // const fetchingUser = async (emailId) => {
    //     const res = await fetch("api/usuarios/"+emailId,  {method: "GET"})
    //     const data = await res.json()

    //     if (data ){
    //         const res2 = await fetch("api/usuarios/"+emailId,  {method: "PUT",body: JSON.stringify("")})
    //         const data2 = await res2.json()
            
    //         if (data2.success == true){
    //             setpopUpDone("true")
    //             console.log("true")
    //             console.log(data2)
    //             console.log(popUpDone)
    //         }else{
    //             setpopUpDone("false")
    //             console.log("false")
    //         }
    //     }
    // }
    

    // const fetching = async (idSelect) => {
    //     setloading(true);
    //     console.log(user.email)
    //     await fetchingUser(user.email)
    // }

    // useEffect(() => {

    //     const answer = async () => {
        
    //         const res = await fetch("api/rifa/"+idSelect,  {method: "PUT", body: JSON.stringify({
    //             mail: user.email,
    //             id: user.uid
    //         })})
    //         const data = await res.json()
    //         console.log(data)
    //         setloading(false);
    //         setbuyDone(true)
    //         router.push("/rifa")
    //         router.refresh()
    //     }
        


    //     if (popUpDone === "true" ) {
    //         answer()
           
    //     }

    // }, [popUpDone]);

    // Función para manejar el evento de desplazamiento
  return (
    <div> 
        
        <div className={`bg-black min-h-screen w-full opacity-50 top-0 fixed`}></div>
        <div className='bg-transparent min-h-screen w-full top-0 fixed flex justify-center items-center'>

            <div className='w-96 bg-white h-96 flex justify-end items-center flex-col'>

                {popUpDone == "" && !loading ?
                <>
                <div className='text-black pb-16 flex flex-col gap-6 text-center'>
                    <h1 className='text-3xl'>Rifa {idSelect}</h1>
                    <h1 className='text-xl'>Precio: 200 points</h1>    
                </div>    

                <div>
                    <h2 className='text-black'>¿Desea compra la casilla <b>{idSelect}</b>?</h2>
                </div>

                <div className='py-6 flex gap-6 '>

                <button className="text-black rounded border border-red-700 hover:bg-red-700 hover:text-white transition duration-100 py-2 px-6" onClick={() => showCompra(null)}>Cancel</button>
                
                <button className="text-black rounded border border-green-400 hover:bg-green-400 hover:text-white transition duration-100 py-2 px-6" onClick={() => (fetching(idSelect) ) }>Confirmar</button>
                
                </div>
                </> : null }

                {loading && 
                <>
                
                <div className='text-black pb-16 flex flex-col gap-6 text-center'>
                    <h1 className='text-3xl'></h1>
                    <h1 className='text-xl'></h1>    
                </div>    

                <div>
                    <h2 className='text-black'>Cargando</h2>
                </div>

                <div className='py-6 flex gap-6 '>
                
                </div>
                    

                </>
                    
                }

                

            </div>
            
        </div>
        
        {popUpDone == "false" ? <PopUp showCompra={showCompra} h1={error} button={"Ir al menú principal"} redirect={"rifa"}></PopUp> : null}
        {popUpDone == "true" ? <PopUp showCompra={showCompra} h1={"Se ha realizado la compra! :)"} button={"Ir a las rifas"} redirect={"rifa"}></PopUp> : null}
    </div>
  )
}

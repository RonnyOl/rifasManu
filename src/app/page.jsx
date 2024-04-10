"use client"
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter()
  const [data, setdata] = useState(null)

  useEffect(() => {
    const logout = async () => {
      try{
        await axios.get("test/test1/casca")
      }catch(error){
        console.log(error)
      }
      
    }
    logout()
  }, [])



    useEffect(() => {
      const fetching = async () => {
        const res = await fetch("api/producto")
        const data = await res.json()
        setdata(data)
        console.log(data)
      }
      fetching()
    }, [])
    
    const eliminar = async (id) => {
      const res = await fetch("api/producto/"+ id,  {method: "DELETE"})
      const data = await res.json()
      router.refresh()
      window.location.href = "/" 
  
    }

    const modificar = async (id) => {
    
      router.push("/edit/" + id )
    }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {data &&  <div className="bg-white p-36 " >
            {data.map((luca) => (
              <div className="text-black flex gap-6" key={luca.id}>
              <h2>{luca.data.nombre}</h2>
              <button onClick={() => eliminar(luca.id)} className="rounded border border-black py-2">Eliminar</button>
              <button  onClick={ () => modificar(luca.id)} className="rounded border border-black py-2">Modificar</button>
              </div>
            ))
          }
        </div>}
    </main>
  );
}

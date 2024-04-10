"use client"

import { useEffect, useState } from "react";
import test from "@/functions/test";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
initMercadoPago('TEST-e613581c-e978-4d3a-9c51-f034478d00a6');
export default function ChargePoint() {
   
    const [user, setuser] = useState("")
    const [userInfo, setuserInfo] = useState("")
    const [preferenceID, setpreferenceID] = useState(false)
    const [Cantidad, setCantidad] = useState(null)
    const [cargarBtn, setcargarBtn] = useState(false)
    const [cantidadpre, setcantidadpre] = useState(false)
    
    const handleRadioChange = (e) => {
      setcantidadpre(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setCantidad(cantidadpre)
      console.log('Valor seleccionado:', cantidadpre);
    };


    useEffect(() => {
        if (user ){
            const fetchUser = async () => {
                console.log(user.email)
                const res = await fetch("/api/usuarios/" + user.email, { method: "GET" });
                const data = await res.json(); 
                setuserInfo(data)
                console.log(data);
                fetchRifas()
            }
            const fetchRifas = async () => {
                const res = await fetch("/api/rifav2/" + user.uid , { method: "GET"});
                const data = await res.json(); 
                console.log(data)
                
            }
        fetchUser()
      }
    }, [user])

    useEffect(() => {
      const searchCookie = async () => {
        const res = await fetch("api/auth/login", {
          method: "GET",
        });
        const data = await res.json();
        if (data.success == true){
        setuser(data.user.currentUser)
        
        }
    }
    searchCookie()
  }, []);

  useEffect(() => {
    if (Cantidad != null){
      const mpPreference = async () => {
      const res = await fetch("api/mp", {
        method: "POST",
        body: JSON.stringify({cantidad: Number(Cantidad), uid: userInfo.id})
      });
      const preference = await res.json();
      console.log(preference)
      setpreferenceID(preference.preferenceId)
      
  }
  mpPreference()
}
}, [Cantidad]);
    
  return (
    <div className='bg-black min-h-screen w-full text-white'>
      
        { userInfo &&
            <p>{userInfo.data.coins}</p>  
        }
        <button onClick={() => setcargarBtn(!cargarBtn)} className="px-6 py-3 border">¿Cargar?</button>
      <div className="flex">
      
      {Cantidad == null &&<form onSubmit={handleSubmit}>
      <label>
        <input 
          type="radio" 
          name="radioGroup" 
          value="1" 
          onChange={handleRadioChange} 
        />
        Opción 1
      </label>
      <label>
        <input 
          type="radio" 
          name="radioGroup" 
          value="5" 
          onChange={handleRadioChange} 
          
        />
        Opción 2
      </label>
      <label>
        <input 
          type="radio" 
          name="radioGroup" 
          value="10" 
          onChange={handleRadioChange} 
         
        />
        Opción 3
      </label>
      <button type="submit">Enviar</button>
     </form>}
      
      { preferenceID && 
      <>
      <Wallet initialization={{ preferenceId: preferenceID, redirectMode: "modal" }} customization={{ texts:{ valueProp: 'smart_option'}}} />
      </>}
      </div>
        
    </div>
  )
}

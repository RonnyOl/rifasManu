"use client";
import CompraMenu from "@/components/CompraMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth, db } from "@/app/firebase/config";
import { getAuth, signOut } from "firebase/auth";
import PopUp from "@/components/PopUp";
import MapRifas from "@/components/MapRifas";
import { cookies } from "next/navigation";
export default function Page() {
  const [rifas, setrifas] = useState("");
  const [user, setuser] = useState("")
  const [compraMenu, setcompraMenu] = useState(false);
  const [idSelect, setidSelect] = useState("");
  const [filtroActive, setfiltroActive] = useState(false)
  const [localst, setlocalst] = useState("")

  useEffect(() => {
    const a = async () => {
      const res = await fetch("api/rifa/", { method: "GET"});
      const data = await res.json();
      setrifas(data);
      console.log(data);
    };
    a();
  }, []);
  
  const showCompra = (id) => {
    
    setidSelect(id);
    setcompraMenu(!compraMenu);
    
    if (!compraMenu) {
      document.body.style.overflow = "hidden";
      console.log("a")
    } else {
      document.body.style.overflow = "";
      console.log("b")
    }
  };
  
  const handleFilter = () => {
    setfiltroActive(!filtroActive)
  }


  useEffect(() => {

    if (rifas){
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
  }
}, [rifas]);

  return (
    <section  className="bg-gray-500 min-h-screen w-full">
      <a
        href="#"
        onClick={async () => {
          try{
          const res = await fetch("api/auth/logout", {
            method: "POST",
          });
          const data = await res.json()
          console.log(data, " --------")
          location.reload()}catch(error){
          }
        }}
      >Log out</a>

      <button onClick={handleFilter} className="text-center text-3xl">Mostrar solo disponibles</button>
      
      {rifas && !filtroActive &&  (
        <MapRifas rif={rifas} request={"none"} showCompra={showCompra}></MapRifas>
      )}

      {(rifas && filtroActive && (
        <MapRifas  rif={rifas} request={"none"} showCompra={showCompra} filter={true}></MapRifas>
        ))}

        {rifas.length == 0 && <h2 className="text-6xl">No hay rifas para vender</h2>}

      {compraMenu && (
        <>
          {user ? (
            <CompraMenu
              user={user}
              idSelect={idSelect}
              showCompra={showCompra}
            />
          ) : (
            <PopUp showCompra={showCompra} h1={"Tienes que Logearte"} button={"Ir a logearte"} redirect={"login"}></PopUp>
          )}
        </>
      )}
    </section>
  )
}

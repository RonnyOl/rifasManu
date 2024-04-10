"use client";
import LogOut from "@/functions/LogOut";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const [menu, setmenu] = useState(false)
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [user, setuser] = useState(false)

  const handlerMenu = () => {
    setmenu(!menu)
    if (!menu) {
      document.body.style.overflow = "hidden";
      console.log("a")
    } else {
      document.body.style.overflow = "";
      console.log("b")
    }
  }
  
  useEffect(() => {
    const searchCookie = async () => {
      const res = await fetch("api/auth/login", {
        method: "GET",
      });
      const data = await res.json();
      if (data.success == true){
      setuser(data.user.currentUser)
      setisLoggedIn(true)
      }else{
        setuser({user: "guess"})
      }
    }
    searchCookie()
    console.log(user)
  
}, []);

  return (
    <>
    <nav className="flex sticky top-0 justify-between items-center px-5 h-16 bg-black text-white">
      { user &&<> <div>RIFAS MANU HIT</div>

      <ul className="flex gap-12">
        <Link href={"/rifa"}><li>Inicio</li></Link>
        <Link href={"/rifa"}><li>Rifa</li></Link>
        <Link href={"/contactanos"}><li>Inicio</li></Link>
      </ul>

      <div className="flex justify-center items-center gap-6">
          { !isLoggedIn ? <Link href="/login" className="hidden lg:block">Login</Link> : <a href="#" className="lg:block hidden" onClick={LogOut}
      >Log out</a>}

        <a className="cursor-pointer" onClick={handlerMenu}>
          <svg
            className="lg:hidden"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            fill="white"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
          </svg>
        </a>
          
        </div></>}

    </nav>
    { menu &&
      <header className="">
            <div
              className="sexossss sidebar fixed right-0 h-full bg-black bg-opacity-50 w-full text-white z-10"
            >
              <div
               
                className="sexossss zoom-in-out-box fixed right-0 h-full bg-black w-[15rem] text-white z-20"
              >

  <ul className="flex flex-col py-12 gap-16">
                  <li className="flex items-center justify-start gap-3 pl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 icon icon-tabler icon-tabler-home-2"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M10 12h4v4h-4z" />
                    </svg>{" "}
                    <Link onClick={handlerMenu} title="Inicio" href="/rifa">
                      Inicio
                    </Link>
                  </li>

                  <li className="flex items-center justify-start gap-3 pl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 icon icon-tabler icon-tabler-brand-shopee"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l.867 12.143a2 2 0 0 0 2 1.857h10.276a2 2 0 0 0 2 -1.857l.867 -12.143h-16z" />
                      <path d="M8.5 7c0 -1.653 1.5 -4 3.5 -4s3.5 2.347 3.5 4" />
                      <path d="M9.5 17c.413 .462 1 1 2.5 1s2.5 -.897 2.5 -2s-1 -1.5 -2.5 -2s-2 -1.47 -2 -2c0 -1.104 1 -2 2 -2s1.5 0 2.5 1" />
                    </svg>
                    <Link
                      onClick={handlerMenu}
                      title="Rifa"
                      href="/rifa"
                    >
                      Rifa
                    </Link>
                  </li>
                  <li className="flex items-center justify-start gap-3 pl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 icon icon-tabler icon-tabler-message-share"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 9h8" />
                      <path d="M8 13h6" />
                      <path d="M13 18l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6" />
                      <path d="M16 22l5 -5" />
                      <path d="M21 21.5v-4.5h-4.5" />
                    </svg>
                    <Link onClick={handlerMenu} title="Contacto" href="/contacto">
                      Contacto
                    </Link>
                  </li>
                  {isLoggedIn ? (
                    <li className="flex items-center justify-start gap-3 pl-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 icon icon-tabler icon-tabler-user-cancel"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ffffff"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                        <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M17 21l4 -4" />
                      </svg>
                      <a
                        href="#"
                        title="LogOut"
                        onClick={() => {
                          signOut(auth);
                          cookies.remove("userLoggedIn");
                          handlerMenu();
                        }}
                      >
                        Log out
                      </a>
                    </li>
                  ) : (
                    <li className="flex items-center justify-start gap-3 pl-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 icon icon-tabler icon-tabler-user-cancel"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ffffff"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                        <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M17 21l4 -4" />
                      </svg>
                      <Link onClick={handlerMenu} title="Login" href="/signin">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>


              </div>

              </div>

    </header>}
    </>
  );
}

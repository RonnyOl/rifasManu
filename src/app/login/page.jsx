"use client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { jwt } from "jsonwebtoken";
const Cookies = require("js-cookie");
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, seterrors] = useState(false);
  

  // const HandleSignIn = async (e) => {
  //     e.preventDefault();

  //     try {

  //         const res = await signInWithEmailAndPassword(auth, email, password);
  //         console.log(res)
  //         setEmail('');
  //         setPassword('')
  //         Cookies.set('userLoggedIn', true);
  //         router.push("/rifa")
  //     } catch (error) {
  //         seterrors(true);
  //         console.log(error)
  //     }
  // };

  const HandleSignIn = async (e) => {
    e.preventDefault();
    const res = await fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data, "<--------------");
    if (data.success) {
      console.log(data);
      // setEmail('');
      // setPassword('')
      // Cookies.set('userLoggedIn', true);
      console.log("baaaaaaa");
      window.location.href = "/rifa"
      
    } else {
      seterrors("ERROR: ");
    }
  };

  return (
    <div className="bg-black text-black min-h-screen flex justify-center items-center">
      <form
        onSubmit={HandleSignIn}
        className="bg-white w-[30rem] h-[35rem] flex justify-center py-6 flex-col items-center"
      >
        <h2 className="text-3xl pt-6">Logear</h2>
        <div className="mx-24 py-6 flex flex-col gap-8">
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className={"outline-none border-b-4 pb-3 border-black w-full"}
            placeholder="Correo electronico..."
          ></input>
          <div className="flex flex-col gap-2">
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={
                "outline-none border-b-4 pb-3 w-full border-black " +
                (errors ? "border-red-600 " : null)
              }
              placeholder="Contraseña..."
            ></input>
            {errors && <p className="text-red-500">Contraseña Incorrecta</p>}
          </div>
          {errors && <p>{errors}</p>}

          <button
            className="border border-black p-2 hover:bg-black hover:text-white"
            type="submit"
          >
            Logearse
          </button>

          <div className="border-b-black border-b w-full"></div>
          <button
            className="border border-black p-2 hover:bg-black hover:text-white"
            type="submit"
          >
            <Link href="/registrar">¿No tienes cuenta? Registrarse</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

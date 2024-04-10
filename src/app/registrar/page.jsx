"use client"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/config';
const Cookies = require('js-cookie')

export default function Page() {
    const [email, setEmail] = useState('');
    const [passTam, setpassTam] = useState(false)
    const [password, setPassword] = useState('');
    const [errors, seterrors] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault();
       
        try {
            console.log("saaaaaaa")
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res)
            // await setDoc(doc(db, `usuarios/${res.user.uid}`),{ rol: "user", id: res.user.uid, coins: 0 });
            await setDoc(doc(db, "usuarios", `${res.user.email}`),
            {
                rol: "user",
                email: res.user.email,
                id: res.user.uid,
                coins: 0 
            });
            setEmail('');
            setPassword('')
            Cookies.set('userLoggedIn', true);
            console.log("baaaaaaa")
            window.location.href = '/rifa'
        } catch (error) {
            seterrors("Error: Mail ya usado");
            console.log(error)
        }
    };

    // const handleSignUp = async (e) => {
    //     e.preventDefault();
    //         const res = await fetch("api/auth/", {method: "POST", body: JSON.stringify({email, password})});
    //         const data = await res.json()
    //         if (data.succes){
    //             console.log(data)
    //         // setEmail('');
    //         // setPassword('')
    //         // Cookies.set('userLoggedIn', true);
    //         console.log("baaaaaaa")
    //         console.log(user)
    //         }else{
    //             seterrors("ERROR: ")
    //         }
     
    // };

    useEffect(() => {
        console.log(passTam)
    }, [passTam])
    
  return (
    <div className='bg-black text-black min-h-screen flex justify-center items-center'>
            <form onSubmit={handleSignUp} className='bg-white w-[30rem] h-[35rem] flex justify-start py-6 flex-col items-center'>
                <h2 className='text-3xl pt-6'>Crear cuenta</h2>
                <div className='mx-24 py-6 flex flex-col gap-8'>
                    <input value={email} type="email" onChange={(e) => setEmail(e.target.value)}  className={"outline-none border-b-4 pb-3 border-black w-full"} placeholder='Correo electronico...'></input>
                    <div className='flex flex-col gap-2'><input value={password} type="password" onBlur={(e) => ( e.target.value.length <6 ? setpassTam(true) : setpassTam(false) )} onChange={(e) => setPassword(e.target.value)}  className={"outline-none border-b-4 pb-3 w-full border-black " + (passTam ? "border-red-600 " : null)} placeholder='Contraseña...'></input>
                    {passTam && <p className='text-red-500'>Contraseña menor a 6 caracteres</p>}</div>
                   {errors && <p>{errors}</p>}
                    { passTam == false ? 
                    <button className='border border-black p-2 hover:bg-black hover:text-white' type='submit' >Registrarme</button>
                    :
                    <div className='text-center border border-black p-2 cursor-not-allowed' type='text'>Registrarme</div>
                        }
                    <div className='border-b-black border-b w-full'></div>
                    <button className='border border-black p-2 hover:bg-black hover:text-white' type='submit' ><Link href="/login">¿Ya tienes cuenta? logearse</Link></button>
                </div>
            </form>
    </div>
  )
}

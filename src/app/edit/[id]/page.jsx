/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page({params}) {
    const router = useRouter()
    const [nombre, setnombre] = useState("")

    // useEffect(() => {
    //   fetch("/api/producto/"+ params.id)
    //   .then((res) => res.json())
    //   .then((data) => {console.log(data)
    //     setnombre(data.data.nombre) })
      
    // }, [])

    useEffect(() => {
      fetch("/api/borrar/", {
        method: "GET",
        headers: {
          "apikey": `${process.env.APIKEY}`
          // Otros encabezados si es necesario
        }})
      .then((res) => res.json())
      .then((data) => {console.log(data)
       })
      console.log()
    }, [])
    

    // const submitHandler = async (e) => {
    //     e.preventDefault()
        
    //     const res = await fetch("/api/producto/"+ params.id, {method: "PUT", body: JSON.stringify({nombre})})
    //     const data = await res.json()
    //     router.push("/")
    // }

  return (
    <div>
        <form>
            <input className="text-black" value={nombre} onChange={(e) => setnombre(e.target.value)} placeholder='producto'></input>
            <button type='submit'>Click aquí</button>
        </form>
    </div>
  )
}

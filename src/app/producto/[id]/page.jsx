"use client"
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Page({params}) {
  const [data, setdata] = useState(null)
  

    useEffect(() => {
      
      const pichi = async () => {
          const res = await fetch("/api/producto/" + params.id, {method:"GET"})
          const {data} = await res.json()
          setdata(data)
          console.log(data)
      }
      pichi()
    }, [])
    

  return (
    <div className='bg-black min-h-screen flex justify-center items-center'>
        
       {data && <div className='bg-purple-500 w-full'>
          <h1>NOMBRE DEL PRODUCTO : {data.nombre}</h1>
       </div>}
        
    </div>
  )
}

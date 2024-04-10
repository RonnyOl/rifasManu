import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'
import React from 'react'

export default function PopUp({h1, button, img, redirect, showCompra}) {

  const refresh = () => { 
    window.location.href = `/${redirect}`
  }
  
  return (
    <div> 
        
        <div className='bg-black min-h-screen w-full opacity-50 top-0 absolute'></div>
        <div className='bg-transparent min-h-screen w-full top-0 absolute flex justify-center items-center'>

            <div className='w-[30rem] bg-white h-96 flex justify-end items-center flex-col'>    
                    <img width="150px" src='monkey.jpg'/>
                <div className='text-black pb-16 flex flex-col gap-6 pt-6 text-center'>
                    <h1 className='text-3xl'>{h1}</h1> 
                    
                    <button onClick={refresh} className='text-xl border border-black py-2 hover:bg-black hover:text-white'>{button}</button>    
                </div>    

            </div>

        </div>
       
    </div>
  )
}

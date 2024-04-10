"use client"
import React from 'react'

export default function Page() {
    const submitHandler = async (e) => {
        e.preventDefault()
        const title = e.target.nombre.value

        const res = await fetch("/api/producto", {method: "POST", body: JSON.stringify({title})})
        const data = await res.json()
        console.log(data)
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
            <input className="text-black" id="nombre" placeholder='producto'></input>
            <button type='submit'>Click aquí</button>
        </form>
    </div>
  )
}

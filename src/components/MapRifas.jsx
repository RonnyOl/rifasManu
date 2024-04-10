import React from 'react'

export default function MapRifas({rif, request, showCompra, filter}) {

    return (
        <div className="flex flex-row flex-wrap justify-center gap-6">
            {!filter ? rif.map((rifa) => (
               
                    rifa.data.taken == true ? (
                        <div key={rifa.id} className="bg-transparent flex flex-col cursor-no-drop">
                            <a >
                                <div className="p-12 bg-red-500 text-black">{rifa.id}</div>
                            </a>
                        </div>
                    )
                 :
                (
                    rifa.data.taken == false && (
                        <div key={rifa.id} className="bg-transparent flex flex-col cursor-pointer">
                            <a onClick={() => (showCompra(rifa.id))}>
                                <div className="p-12 bg-white text-black">{rifa.id}</div>
                            </a>
                        </div>
                    )
                )

            ))
        :
        rif.map((rifa) => (
               
            rifa.data.taken == false && (
                <div key={rifa.id} className="bg-transparent flex flex-col cursor-pointer">
                    <a onClick={() => showCompra(rifa.id)}>
                        <div className="p-12 bg-white text-black">{rifa.id}</div>
                    </a>
                </div>
            )))
        }
        </div>
    )
}

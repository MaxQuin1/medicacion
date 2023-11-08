import React from 'react'
import Formulario from '../content/Formulario'
import { Link } from 'react-router-dom'

function Medicamento() {
  const id_usuario = window.location.href.split("/")[4];
  
  return (
    <>
    <div className='bg-blue-200 h-screen '> 
    <div className="ml-20 ">
        <h1 className="font-black text-5xl text-blue-900"> Nueva receta </h1>
        <p className="mt-4 text-2xl">Llena los campos para agregar a la receta</p>
        <div className="flex justify-end mr-20">
        <button className="bg-sky-900 text-white px-3 py-2 mb-1 font-bold uppercase rounded-3xl">
        <Link to= {`/home/${id_usuario}`}>Regresar</Link>
        </button>
      </div>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-2 mb-10">
          <Formulario/>
      </div>
      </div>
    </>
  )
}

export default Medicamento

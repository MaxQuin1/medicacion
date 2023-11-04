import React from 'react'
import Formulario from '../content/Formulario'
import { Form } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Medicamento() {
  return (
    <>
    <div className='bg-blue-200 h-screen '> 
    <div className="ml-20 pt-5 ">
        <h1 className="font-black text-5xl text-blue-900"> Nueva receta </h1>
        <p className="mt-4 text-2xl">Llena los campos para agregar la receta</p>
        <div className="flex justify-end mr-20">
        <button className="bg-sky-900 text-white px-3 py-2 mb-1 font-bold uppercase rounded-3xl">
          <Link to="/home">Regresar</Link>
        </button>
      </div>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-2 mb-10">
        <Form method="post" onSubmit={'Nueva receta'}>
          <Formulario/>
          <button 
          className="mt-2 w-full rounded-xl h-[120%] bg-sky-800 upperccase font-bold text-white text-lg"
          value="Registrar medicamento"
          onChange={'Nueva receta'}
          type='submit'>
            Agregar receta
          </button>
        
        </Form>
      </div>
      </div>
    </>
  )
}

export default Medicamento
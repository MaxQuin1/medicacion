import React from 'react'

export default function Login() {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block ">
      <img className="w-full h-full object-cover" src='https://elglobal.es/wp-content/uploads/2022/03/GettyImages-1311641109.jpg'></img>
      </div>

      <div className="flex flex-col justify-center bg-sky-500">
        <form className="max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg bg-white">
          <h2 className="text-3xl text-center font-bold">Iniciar de sesion</h2>
          <div className="flex flex-col py-2">
            <input
              className=" bg-white mt-2 p-2 border border-black rounded-lg"
              type="text"
              placeholder="email"
            ></input>
          </div>
          <div className="flex flex-col py-2">
            <input
              className=" bg-white mt-2 p-2 border border-black rounded-lg"
              type="Password"
              placeholder="password"
            ></input>
          </div>
          
          <div className="mb-6 text-center mt-4 ">
            {/* <Link to="/home"> */}
              <button className="rounded-lg w-20 h-10 p-0 m-2 bg-green-400">
                <p className='text-center '>Login</p>
                </button>
            {/* </Link> */}

            <p>¿Eres nuevo?</p>
             {/* <Link to="/Registro"> */}
               <button className="bg-sky-100 p-3 rounded-lg m-2">Register</button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

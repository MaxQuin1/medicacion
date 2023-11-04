import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    try {
      const response = await axios.post("http://localhost:8082/login", {
        correo_electronico: email,
        contrasena: password,
      });

      if (response.data.status) {
        const idUsuario = response.data.respuesta;
        console.log(idUsuario);
        window.location.href = (`/home/${idUsuario}`);
      } else {
        console.log('Prueba con otro correo o contraseña');
      }
    } catch (error) {
      console.error("Error al autenticar el usuario:", error);
    }
  };

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block ">
      <img className="w-full h-full object-cover" src='https://elglobal.es/wp-content/uploads/2022/03/GettyImages-1311641109.jpg' alt=''/>
      </div>
      <div className="flex flex-col justify-center bg-sky-500">
        <form className="max-w-[400px] w-full mx-auto p-8 px-8 rounded-lg bg-white">
          <h2 className="text-3xl text-center font-bold">Iniciar de sesion</h2>
          <div className="flex flex-col py-2">
            <input
              className=" bg-white mt-2 p-2 border border-black rounded-lg"
              type="text"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
            ></input>
          </div>
          <div className="flex flex-col py-2">
            <input
              className=" bg-white mt-2 p-2 border border-black rounded-lg"
              type="password"
                  placeholder="Contraseña"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
            ></input>
          </div>
          <div className="mb-6 text-center mt-4 ">
              <button 
              className="rounded-lg w-20 h-10 p-0 m-2 bg-green-400"
              onClick={Login}>
                <p className='text-center '>Login</p>
                </button>
            <p>¿Eres nuevo?</p>
             <Link to="/Registro">
               <button className="bg-sky-100 p-3 rounded-lg m-2">Register</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

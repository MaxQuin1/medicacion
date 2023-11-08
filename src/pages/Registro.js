import React, { useState } from "react";
import "../App.css";
import axios from "axios";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [fecha, setFecha] = useState("");

  const Register = async () => {
    const response = await axios.post("http://localhost:8082/agregarUsuario", {
        nombre_usuario: nombre,
        correo_electronico: correo,
        contrasena: contrasena,
        fecha_nacimiento: fecha,
    });
    if(response.data){
      window.location.href = "/";
      alert('Paciente registrado correctamente')
    } else{
      console.log('Fallo en agregar usuario')
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" id="mydiv">
      <div className="flex items-center justify-center h-full text-white">
        <div className="max-w-md w-full bg-sky-600 rounded-lg p-6">
          <h2 className="text-xl font-bold text-center mb-2">
            Ingresa tus datos personales
          </h2>
          <form onSubmit={Register}>
            <div className="mb-2">
              <input
                className="w-full p-2 border rounded-lg text-black"
                type="text"
                placeholder="Nombre"
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <input
                className="w-full p-2 border rounded-lg text-black"
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setCorreo(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <input
                className="w-full p-2 border rounded-lg text-black"
                type="password"
                placeholder="Contraseña"
                onChange={(e) => {
                  setContrasena(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <input
                className="w-full p-2 border rounded-lg text-black"
                type="date"
                onChange={(e) => {
                  setFecha(e.target.value);
                }}
              />
            </div>
            <div className="text-center">
              <button
                className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

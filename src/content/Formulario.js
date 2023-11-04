import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Formulario() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [vias, setVias] = useState([]);
  const [medida , setMedida] = useState([]);

  useEffect(() => {
    async function fetchMedicamentos() {
      try {
        const response = await axios.get(
          "http://localhost:8082/verMedicamentos"
        );
        setMedicamentos(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchMedicamentos();
  }, []);

  useEffect(() => {
    async function fetchViasAdministracion() {
      try {
        const response = await axios.get(
          "http://localhost:8082/verViasAdministracion"
        );
        setVias(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchViasAdministracion();
  }, []);

  useEffect(() => {
    async function fetchUnidadMedida() {
      try {
        const response = await axios.get(
          "http://localhost:8082/verUnidadMedida"
        );
        setMedida(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchUnidadMedida();
  }, []);

  return (
    <>
      <table className="w-full text-left">
        <tr className="gap-4">
          <td className="text-xl">
            <div className="mb-4 mr-2">
              <label className="text-gray-800 ml-3" htmlFor="nombre">
                Nombre del medicamento:
              </label>
              <select
                type="text"
                className="mt-2 flow-root w-full p-3 rounded-xl bg-gray-50"
              >
                {medicamentos.map((medicamento) => (
                  <option
                  className="text-black"
                    key={medicamento.id}
                    value={medicamento.nombre_medicmamento}
                  >
                    {medicamento.nombre_medicmamento}
                  </option>
                ))}
              </select>
            </div>
          </td>
          <td className="text-xl">
            <div className="mb-4">
              <label className="text-gray-800 ml-3" htmlFor="descrpcion">
                Vía:
              </label>
              <select
                type="text"
                className="mt-2 flow-root w-full p-3 rounded-xl bg-gray-50"
              >
                {vias.map((via) => (
                  <option
                  className="text-black"
                    key={via.id}
                    value={via.nombre_via}
                  >
                    {via.nombre_via}
                  </option>
                ))}
              </select>
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-xl">
            <div className="mb-4 mr-2">
              <label className="text-gray-800 ml-3" htmlFor="nombre">
                Cantidad:
              </label>
              <input
                id="Medicamento"
                type="text"
                className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-50"
                placeholder="Nombre del medicamento "
                name="Medicamento"
                onChange={() =>{

                }}
              />
            </div>
          </td>
          <td className="text-xl">
            <div className="mb-4">
              <label className="text-gray-800 ml-3" htmlFor="descrpcion">
                Unidad de medida:
              </label>
              <select
                type="text"
                className="mt-2 flow-root w-full p-3 rounded-xl bg-gray-50"
              >
                {medida.map((unidad) => (
                  <option
                  className="text-black"
                    key={unidad.id}
                    value={unidad.nombre_unidad_medida}
                  >
                    {unidad.nombre_unidad_medida}
                  </option>
                ))}
              </select>
            </div>
          </td>
        </tr>
        <tr className="">
          <td className="text-xl">
            <div className="mb-4 mr-2">
              <label className="text-gray-800 ml-3" htmlFor="descrpcion">
                Días:
              </label>
              <input
                id="dias"
                type="dias"
                className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-50"
                placeholder="Días"
                name="dias"
                onChange={() =>{
                  
                }}
              />
            </div>
          </td>
          <td className="text-xl">
            <div className="mb-4">
              <label className="text-gray-800 ml-3" htmlFor="descrpcion">
                ¿Cada cuántas horas?:
              </label>
              <input
                id="horas"
                type="text"
                className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-50"
                placeholder="¿Cada cuántas horas?"
                name="horas"
                onChange={() =>{
                  
                }}
              />
            </div>
          </td>
        </tr>
      </table>
    </>
  );
}

export default Formulario;

import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function MedicamentosPendientes() {
  // consigo el id del usuario con el que se loguea
  const id_usuario = window.location.href.split("/")[4];
  // constante de estado para las recetas de la BD
  const [recetas, setRecetas] = useState([]);

  // creo el evento secundario para pedir las recetas de la BD
  useEffect(() => {
    async function fetchRecetas() {
      try {
        const response = await axios.get(
          `http://localhost:8082/verReceta/${id_usuario}`
        );
        setRecetas(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchRecetas();
  }, []);

  const TomarDosis = async (id) => {
    // const index = recetas.findIndex((receta) => receta.id_receta === id);

    // // Elimina el elemento si se encuentra
    // if (index !== -1) {
    //     recetas.splice(index, 1);
    // }

    try {
      const response = await axios.put(
        `http://localhost:8082/modificarFecha/${id}`
      );
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al actualizar la fecha:", error);
    }
    window.location.href = `/home/${id_usuario}`;
    alert('Medicamento tomado puedes revisarlo')
  };

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Nombre del medicamento
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {recetas.map((receta) => (
            <tr key={receta.id_receta}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {receta.medicamento}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button
                  onClick={() => TomarDosis(receta.id_receta)}
                  className="bg-red-400 text-white px-2 py-1 rounded-xl text-xs"
                >
                  Tomar Dosis
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

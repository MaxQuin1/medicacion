import React, { useState, useEffect } from "react";
import axios from "axios";

function Formulario() {
  const id_usuario = window.location.href.split("/")[4];
  const [medicamentos, setMedicamentos] = useState([]);
  const [vias, setVias] = useState([]);
  const [medidas, setMedidas] = useState([]);
  const [medicamento, setMedicamento] = useState("");
  const [via, setVia] = useState("");
  const [unidad, setUnidad] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [dias, setDias] = useState("");
  const [intervalo, setIntervalo] = useState("");
  const [comentario, setComentario] = useState('');

  const crearReceta = async (e) => {
    const diasEnMilisegundos = dias * 86400000;
    const intervaloEnMilisegundos = intervalo * 3600000;
    const dosisCalculada = diasEnMilisegundos / intervaloEnMilisegundos;

    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/crearReceta", {
        usuario: id_usuario,
        medicamento: medicamento,
        via: via,
        unidad: unidad,
        cantidad: cantidad,
        dias: dias,
        intervalo: intervalo,
        dosis: dosisCalculada,
        comentario: comentario
      });
      console.log("Respuesta del servidor:", response.data);
      window.location.href = `/home/${id_usuario}`;
      alert('Receta agregada correctamente')
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

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
        setMedidas(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchUnidadMedida();
  }, []);
  
  return (
    <>
      <form onSubmit={crearReceta}>
        <table className="w-full text-left ">
          <thead>
            <tr className="">
              <td className="text-xl">
                <div className="mb-4 mr-2">
                  <label className="text-gray-800 ml-3" htmlFor="nombre">
                    Nombre del medicamento:
                  </label>
                  <select
                    value={medicamento}
                    onChange={(e) => setMedicamento(e.target.value)}
                    className="mt-2 flow-root w-full p-3 rounded-xl bg-gray-100"
                  >
                    {medicamentos.map((medicamento) => (
                      <option
                        className="text-black"
                        key={medicamento.id_medicamento}
                        value={medicamento.id_medicamento}
                      >
                        {medicamento.nombre_medicmamento}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td className="text-xl">
                <div className="mb-4">
                  <label className="text-gray-800 ml-3" htmlFor="descripcion">
                    Vía:
                  </label>
                  <select
                    value={via}
                    onChange={(e) => setVia(e.target.value)}
                    className="mt-2 flow-root w-full p-3 rounded-xl bg-gray-100"
                  >
                    {vias.map((via) => (
                      <option
                        className="text-black"
                        key={via.id_via_administracion}
                        value={via.id_via_administracion}
                      >
                        {via.nombre_via}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-xl">
                <div className="mb-4">
                  <label className="text-gray-800 ml-3" htmlFor="descripcion">
                    Unidad de medida:
                  </label>
                  <select
                    value={unidad}
                    onChange={(e) => setUnidad(e.target.value)}
                    className="mt-2 flow-root w-full p-3 rounded-xl bg-gray-100"
                  >
                    {medidas.map((unidad) => (
                      <option
                        className="text-black"
                        key={unidad.id_unidad_medida}
                        value={unidad.id_unidad_medida}
                      >
                        {unidad.nombre_unidad_medida}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td className="text-xl">
                <div className="mb-4 mr-1">
                  <label className="text-gray-800 ml-3" htmlFor="nombre">
                    Cantidad:
                  </label>
                  <input
                    type="number"
                    className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-100"
                    placeholder="Cantidad de dosis"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr className="">
              <td className="text-xl">
                <div className="mb-4 mr-2">
                  <label className="text-gray-800 ml-3" htmlFor="descripcion">
                    Días:
                  </label>
                  <input
                    type="number"
                    className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-100"
                    placeholder="Días"
                    value={dias}
                    onChange={(e) => setDias(e.target.value)}
                  />
                </div>
              </td>
              <td className="text-xl">
                <div className="mb-4">
                  <label className="text-gray-800 ml-3" htmlFor="descripcion">
                    ¿Cada cuántas horas?:
                  </label>
                  <input
                    type="number"
                    className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-100"
                    placeholder="¿Cada cuántas horas?"
                    value={intervalo}
                    onChange={(e) => setIntervalo(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr className="">
            <td className="text-xl">
                <div className="mb-4 w-full">
                  <label className="text-gray-800 ml-3" htmlFor="descripcion">
                    Agrega un comentario: opcional
                  </label>
                  <input
                    type="text"
                    className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-100"
                    placeholder="Comentario"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="mt-2 w-full rounded-xl h-[120%] bg-sky-800 upperccase font-bold text-white text-lg"
          type="submit"
        >
          Agregar receta
        </button>
      </form>
    </>
  );
}

export default Formulario;

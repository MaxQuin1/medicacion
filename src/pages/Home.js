import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import sol from "../img/sol.png";
import evening from "../img/evening.png";
import amanecer from "../img/amanecer.png";
import luna from "../img/luna.png";
import pastillas from "../img/pastillas.png";
import { Link } from "react-router-dom";

export default function Home() {
  const id_usuario = window.location.href.split("/")[4];
  const [recetas, setRecetas] = useState([]);
  // const [dosisActual, setDosisActual] = useState(0);

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

  const dosisTotal = recetas.map((receta) => {
    const dias = receta.dias * 86400000;
    const intervalo = receta.intervalo * 3600000;
    const dosis = dias / intervalo;

    return dosis;
  });

  // console.log(dosisTotal);

  const nuevasFechas = recetas.map((receta, i) => {
    const fechaInicial = new Date(receta.fecha);
    const intervalo = receta.intervalo * 3600000;
    const dosisPorReceta = dosisTotal[i];
    const fechas = [];
    let fechaActual = fechaInicial;

    for (let i = 0; i < dosisPorReceta; i++) {
      fechas.push(new Date(fechaActual));
      fechaActual = new Date(fechaActual.getTime() + intervalo);
    }

    return fechas;
  });

  // console.log(nuevasFechas)

  const horarios = [
    {
      nombre: "morning",
      hora_inicio: 0.0,
      hora_final: 5.59,
    },
    {
      nombre: "noon",
      hora_inicio: 6.0,
      hora_final: 11.59,
    },
    {
      nombre: "tarde",
      hora_inicio: 12.0,
      hora_final: 17.59,
    },
    {
      nombre: "night",
      hora_inicio: 18.0,
      hora_final: 23.59,
    },
  ];

  function obtenerNombreHorario(fecha) {
    const horaFecha = fecha.getHours() + fecha.getMinutes() / 60;

    for (const horario of horarios) {
      if (horaFecha >= horario.hora_inicio && horaFecha <= horario.hora_final) {
        return horario.nombre;
      }
    }
  }

  const recetasConHorario = recetas.map((receta, i) => {
    const fechasReceta = nuevasFechas[i];

    const dosisConHorario = fechasReceta.map((fecha) => ({
      fecha,
      nombre_horario: obtenerNombreHorario(fecha),
    }));

    return {
      ...receta,
      dosisConHorario,
    };
  });

  console.log(recetasConHorario);

  const actualizarDosisActual = (id) => {};

  return (
    <>
      <div className="bg-blue-200">
        <div dir="rtl" className="b-0">
          <button className="align-top rounded-bl-lg w-[55px] h-[55px] bg-blue-400 mt-0 ml-8 mb-0 text-top">
            <Link to={`/medicamento/${id_usuario}`}>
              <p className="text-2xl ">+</p>
            </Link>
          </button>
        </div>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white rounded-lg shadow-lg p-1  lg:w-2/3">
            <div className="m-5 border ">
              <div className="flex ml-[24%] gap-[8%] w-full">
                <b className="">Medicamentos</b>
                <b className="">Dosis</b>
                <b className="">Tiempo</b>
                <b className="">Dia</b>
                <b className="">Comentarios</b>
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td
                      className="bg-red-200"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="4"
                    >
                      <img
                        src={sol}
                        alt="sol"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  {recetasConHorario.map((receta) => {
                    const primeraDosis = receta.dosisConHorario[0];
                    if (
                      primeraDosis &&
                      primeraDosis.nombre_horario === "morning"
                    ) {
                      return (
                        <tr className="bg-red-100 text-center">
                          <td>{receta.medicamento}</td>
                          <td>
                            {receta.cantidad}
                            {receta.unidad}
                          </td>
                          <td>
                            {primeraDosis.fecha.getHours()}:
                            {primeraDosis.fecha.getMinutes()}
                          </td>
                          <td>{primeraDosis.fecha.toLocaleDateString()}</td>
                          <td>
                            <button
                              onClick={() =>
                                actualizarDosisActual(receta.id_receta)
                              }
                            >
                              Check
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={receta.id} className="bg-red-100 text-center">
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              {/* */}
              <table className="w-full mt-1">
                <tbody>
                  <tr>
                    <td
                      className="bg-yellow-200"
                      style={{
                        textAlign: "center",
                      }}
                      rowSpan="4"
                    >
                      <img
                        src={amanecer}
                        alt="sol"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  {recetasConHorario.map((receta) => {
                    const primeraDosis = receta.dosisConHorario[0];

                    if (
                      primeraDosis &&
                      primeraDosis.nombre_horario === "noon"
                    ) {
                      return (
                        <tr className="bg-yellow-100 text-center">
                          <td>{receta.medicamento}</td>
                          <td>
                            {receta.cantidad}
                            {receta.unidad}
                          </td>
                          <td>
                            {primeraDosis.fecha.getHours()}:
                            {primeraDosis.fecha.getMinutes()}
                          </td>
                          <td>{primeraDosis.fecha.toLocaleDateString()}</td>
                          <td>
                            <button
                              onClick={() =>
                                actualizarDosisActual(receta.id_receta)
                              }
                            >
                              Check
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr
                          key={receta.id}
                          className="bg-yellow-100 text-center"
                        >
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              {/* */}
              <table className="w-full mt-1">
                <tbody>
                  <tr>
                    <td
                      className="bg-green-200"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="4"
                    >
                      <img
                        src={evening}
                        alt="sol"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  {recetasConHorario.map((receta) => {
                    const primeraDosis = receta.dosisConHorario[0];

                    if (
                      primeraDosis &&
                      primeraDosis.nombre_horario === "tarde"
                    ) {
                      return (
                        <tr className="bg-green-100 text-center">
                          <td>{receta.medicamento}</td>
                          <td>
                            {receta.cantidad}
                            {receta.unidad}
                          </td>
                          <td>
                            {primeraDosis.fecha.getHours()}:
                            {primeraDosis.fecha.getMinutes()}
                          </td>
                          <td>{primeraDosis.fecha.toLocaleDateString()}</td>
                          <td>
                            <button
                              onClick={() =>
                                actualizarDosisActual(receta.id_receta)
                              }
                            >
                              Check
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr
                          key={receta.id}
                          className="bg-green-100 text-center"
                        >
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              {/* */}
              <table className="w-full mt-1">
                <tbody>
                  <tr>
                    <td
                      className="bg-blue-200"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="4"
                    >
                      <img
                        src={luna}
                        alt="sol"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  {recetasConHorario.map((receta) => {
                    const primeraDosis = receta.dosisConHorario[0];

                    if (
                      primeraDosis &&
                      primeraDosis.nombre_horario === "night"
                    ) {
                      return (
                        <tr className="bg-blue-100 text-center">
                          <td>{receta.medicamento}</td>
                          <td>
                            {receta.cantidad}
                            {receta.unidad}
                          </td>
                          <td>
                            {primeraDosis.fecha.getHours()}:
                            {primeraDosis.fecha.getMinutes()}
                          </td>
                          <td>{primeraDosis.fecha.toLocaleDateString()}</td>
                          <td>
                            <button
                              onClick={() =>
                                actualizarDosisActual(receta.id_receta)
                              }
                            >
                              Check
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={receta.id} className="bg-blue-100 text-center">
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                          <td>vacio</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              {/* */}
              <table className="w-full mt-1">
                <tbody>
                  <tr>
                    <td
                      className="bg-green-200"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="4"
                    >
                      <img
                        src={pastillas}
                        alt="sol"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  <tr className="bg-green-300 text-center">
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                  </tr>
                  <tr className="bg-green-200 text-center">
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                  </tr>
                  <tr className="bg-green-300 text-center">
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                    <td className="">vacio</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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

  const nuevasFechas = recetas.map((receta) => {
    const fechaInicial = new Date(receta.fecha);
    const intervaloEnMilisegundos = receta.intervalo * 3600000;
    const fechasReceta = [];
    let fechaActual = fechaInicial;

    for (let i = 0; i <= receta.dias; i++) {
      fechasReceta.push(new Date(fechaActual));
      fechaActual = new Date(fechaActual.getTime() + intervaloEnMilisegundos);
    }

    return fechasReceta;
  });

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

  const recetasConHorario = [];

  for (let index = 0; index < recetas.length; index++) {
    const receta = recetas[index];
    const fechasReceta = nuevasFechas[index];
    const fechasConHorario = [];

    for (const fecha of fechasReceta) {
      let nombreHorario = "";

      if (fecha instanceof Date && !isNaN(fecha)) {
        const horaFecha = fecha.getHours() + fecha.getMinutes() / 60;

        for (const horario of horarios) {
          if (
            horaFecha >= horario.hora_inicio &&
            horaFecha <= horario.hora_final
          ) {
            nombreHorario = horario.nombre;
            break;
          }
        }
      }

      fechasConHorario.push({
        fecha,
        nombre_horario: nombreHorario,
      });
    }

    recetasConHorario.push({
      ...receta,
      fechasConHorario,
    });
  }  

  console.log(recetasConHorario);

  // const recetaFinal = recetasConHorario.map(() =>{

  // });

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
              <table className="w-full ">
                <tr className="text-center text-xl">
                  <th></th>
                  <th>Medications</th>
                  <th>Dosage</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Comments</th>
                </tr>
                <colgroup>
                  <col style={{ borderRight: "2px solid #FFFFFF" }} />
                  <col style={{ borderRight: "2px solid #FFFFFF" }} />
                  <col style={{ borderRight: "2px solid #FFFFFF" }} />
                  <col style={{ borderRight: "2px solid #FFFFFF" }} />
                  <col style={{ borderRight: "2px solid #FFFFFF" }} />
                  <col />
                </colgroup>
                <tr>
                  <td
                    className="bg-red-200"
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "2px solid #FFFFFF",
                    }}
                    rowSpan="3"
                  >
                    <img
                      src={sol}
                      alt="sol"
                      style={{ display: "inline-block" }}
                    />
                  </td>
                  <td className="bg-red-200">Hola</td>
                  <td className="bg-red-200">Hola</td>
                  <td className="bg-red-200">Hola</td>
                  <td className="bg-red-200">Hola</td>
                  <td className="bg-red-200">Hola</td>
                </tr>
                <tr>
                  <td className="bg-red-100">Hola</td>
                  <td className="bg-red-100">Hola</td>
                  <td className="bg-red-100">Hola</td>
                  <td className="bg-red-100">Hola</td>
                  <td className="bg-red-100">Hola</td>
                </tr>
                <tr>
                  <td
                    className="bg-red-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-red-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-red-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-red-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-red-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                </tr>
                {/* */}
                <tr>
                  <td
                    className="bg-amber-100"
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "2px solid #FFFFFF",
                    }}
                    rowSpan="3"
                  >
                    <img
                      src={amanecer}
                      alt="amanecer"
                      style={{ display: "inline-block" }}
                    />
                  </td>
                  <td className="bg-yellow-200">Hola</td>
                  <td className="bg-yellow-200">Hola</td>
                  <td className="bg-yellow-200">Hola</td>
                  <td className="bg-yellow-200">Hola</td>
                  <td className="bg-yellow-200">Hola</td>
                </tr>
                <tr>
                  <td className="bg-yellow-100">Hola</td>
                  <td className="bg-yellow-100">Hola</td>
                  <td className="bg-yellow-100">Hola</td>
                  <td className="bg-yellow-100">Hola</td>
                  <td className="bg-yellow-100">Hola</td>
                </tr>
                <tr>
                  <td
                    className="bg-yellow-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-yellow-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-yellow-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-yellow-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-yellow-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                </tr>
                {/* */}
                <tr>
                  <td
                    className="bg-green-300"
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "2px solid #FFFFFF",
                    }}
                    rowSpan="3"
                  >
                    <img
                      src={evening}
                      alt="evening"
                      style={{ display: "inline-block" }}
                    />
                  </td>
                  <td className="bg-green-300">Hola</td>
                  <td className="bg-green-300">Hola</td>
                  <td className="bg-green-300">Hola</td>
                  <td className="bg-green-300">Hola</td>
                  <td className="bg-green-300">Hola</td>
                </tr>
                <tr>
                  <td className="bg-green-200">Hola</td>
                  <td className="bg-green-200">Hola</td>
                  <td className="bg-green-200">Hola</td>
                  <td className="bg-green-200">Hola</td>
                  <td className="bg-green-200">Hola</td>
                </tr>
                <tr>
                  <td
                    className="bg-green-300"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-green-300"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-green-300"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-green-300"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-green-300"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                </tr>
                {/* */}
                <tr>
                  <td
                    className="bg-blue-200"
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "2px solid #FFFFFF",
                    }}
                    rowSpan="3"
                  >
                    <img
                      src={luna}
                      alt="luna"
                      style={{ display: "inline-block" }}
                    />
                  </td>
                  <td className="bg-blue-200">Hola</td>
                  <td className="bg-blue-200">Hola</td>
                  <td className="bg-blue-200">Hola</td>
                  <td className="bg-blue-200">Hola</td>
                  <td className="bg-blue-200">Hola</td>
                </tr>
                <tr>
                  <td className="bg-blue-100">Hola</td>
                  <td className="bg-blue-100">Hola</td>
                  <td className="bg-blue-100">Hola</td>
                  <td className="bg-blue-100">Hola</td>
                  <td className="bg-blue-100">Hola</td>
                </tr>
                <tr>
                  <td
                    className="bg-blue-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-blue-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-blue-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-blue-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-blue-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                </tr>
                {/* */}
                <tr>
                  <td
                    className="bg-green-200"
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "2px solid #FFFFFF",
                    }}
                    rowSpan="3"
                  >
                    <img
                      src={pastillas}
                      alt="pastillas"
                      style={{ display: "inline-block" }}
                    />
                  </td>
                  <td className="bg-green-200">Hola</td>
                  <td className="bg-green-200">Hola</td>
                  <td className="bg-green-200">Hola</td>
                  <td className="bg-green-200">Hola</td>
                  <td className="bg-green-200">Hola</td>
                </tr>
                <tr>
                  <td className="bg-green-100">Hola</td>
                  <td className="bg-green-100">Hola</td>
                  <td className="bg-green-100">Hola</td>
                  <td className="bg-green-100">Hola</td>
                  <td className="bg-green-100">Hola</td>
                </tr>
                <tr>
                  <td
                    className="bg-green-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-green-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-green-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-green-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                  <td
                    className="bg-green-200"
                    style={{
                      borderBottom: "2px solid #FFFFFF",
                    }}
                  >
                    Hola
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

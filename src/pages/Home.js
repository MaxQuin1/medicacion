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

const dosisPorDia = recetas.map((receta) => {
  const dias = receta.dias * 86400000;
  const intervalo = receta.intervalo * 3600000;
  const dosis = dias / intervalo;

  return dosis;
});

// dosisPorDia ahora contiene un array con la cantidad de dosis por día para cada receta
console.log(dosisPorDia);


  const nuevasFechas = recetas.map((receta) => {
    const fechaInicial = new Date(receta.fecha);
    const intervaloEnMilisegundos = receta.intervalo * 3600000;
    const fechasReceta = [];
    let fechaActual = fechaInicial;

    for (let i = 0; i <= dosisPorDia; i++) {
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
    const dosisConHorario = [];

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

      dosisConHorario.push({
        fecha,
        nombre_horario: nombreHorario,
      });
    }

    recetasConHorario.push({
      ...receta,
      dosisConHorario,
    });
  }  

  console.log(recetasConHorario);

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
            <div className="flex ml-[27%] w-full">
                  <b className="pl-5">Medicamentos</b>
                  <b className="pl-7 ">Dosis</b>
                  <b className="pl-20">Tiempo</b>
                  <b className="pl-14">Dia</b>
                  <b className="pl-12">Comentarios</b>
                  </div>
                <table className="w-full">
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
                <tr className="bg-red-100 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className="bg-red-200 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className="bg-red-100 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                </table>
                {/* */}
                <table className="w-full mt-1">
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
                <tr className="bg-yellow-100 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className="bg-yellow-200 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className="bg-yellow-100 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                </table>
                {/* */}
                <table className="w-full mt-1">
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
                <tr className="bg-green-100 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className="bg-green-200 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className="bg-green-100 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                </table>
                {/* */}
                <table className="w-full mt-1">
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
                <tr className="bg-blue-100 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className="bg-blue-200 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className='bg-blue-100 text-center'>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                </table>
                {/* */}
                <table className="w-full mt-1">
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
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className="bg-green-200 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                <tr className="bg-green-300 text-center">
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                  <td className="">Hola</td>
                </tr>
                </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

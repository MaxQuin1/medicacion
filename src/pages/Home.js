import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import sol from "../img/sol.png";
import evening from "../img/evening.png";
import amanecer from "../img/amanecer.png";
import luna from "../img/luna.png";
import pastillas from "../img/pastillas.png";
import { Link } from "react-router-dom";
import AddComentario from "../content/AddComentario";

export default function Home() {
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

  // declaro las variables para manipular la fecha de la BD
  const nuevasFechas = recetas.map((receta) => {
    const fechaInicial = new Date(receta.fecha);
    const intervalo = receta.intervalo * 3600000;
    const dosisPorReceta = receta.dosis;
    // arreglo con las fechas
    const fechas = [];
    let fechaActual = fechaInicial;
    /* inicio el ciclo para sacar un arreglo donde se creen las
    fechas dependiendo de las dosis y el intervalo */
    for (let i = 0; i < dosisPorReceta; i++) {
      fechas.push(new Date(fechaActual));
      fechaActual = new Date(fechaActual.getTime() + intervalo);
    }
    // retorno las fechas para que se almacenen en nuevasFechas
    return fechas;
  });

  // console.log(nuevasFechas)

  /* creo el obejto horarios para poder
  comparar las fechas segun mis tiempos */
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

  /* se crea la funcion para obtener el nombre del horario
  mediante comparar con el objeto de horarios */
  function obtenerNombreHorario(fecha) {
    const horaFecha = fecha.getHours() + fecha.getMinutes() / 60;

    for (const horario of horarios) {
      if (horaFecha >= horario.hora_inicio && horaFecha <= horario.hora_final) {
        return horario.nombre;
      }
    }
  }

  /* se agrega al arreglo de receta las nuevas fechas en un arreglo
  nuevo llamado dosisConHorario */
  const recetasConHorario = recetas.map((receta, i) => {
    const fechasReceta = nuevasFechas[i];

    const dosisConHorario = fechasReceta.map((fecha) => ({
      // agrego la fecha
      fecha,
      // llamo a la funcion para saber que horario es
      nombre_horario: obtenerNombreHorario(fecha),
    }));

    return {
      ...receta,
      // agrego todo el arreglo a mi arreglo original
      dosisConHorario,
    };
  });

  // console.log(recetasConHorario)

  // obtengo la hora actual
  const fechaActual = new Date();
  // creo el nuevo array que contendra todos los cambios
  let recetasConHorarioActualizado = recetasConHorario.map((receta) => {
    // Filtra las fechas dentro del rango de las próximas 24 horas
    const fechasRangoDia = receta.dosisConHorario.filter((fechaObj) => {
      const fecha = new Date(fechaObj.fecha);
      // comparo la diferencia entre el tiempo actual y la fecha del arreglo
      const tiempoDiferencia = fecha.getTime() - fechaActual.getTime();
      // convierto a horas la diferencia
      const horasDiferencia = tiempoDiferencia / (1000 * 60 * 60);
      /* agrego al arreglo horasDiferencia las que cumplan con el tiempo
      y devuelvo ese valor a fechasRangoDia*/
      return horasDiferencia >= 0 && horasDiferencia <= 24;
    });

    return {
      /* agrego al array un nuevo array llamado primerasFechas
      que contendra las fechas de fechasRangoDia */
      ...receta,
      primerasFechas: fechasRangoDia,
    };
  });

  const actualizarDosisActual = async (id) => {
    // Buscar la receta correspondiente
    const recetaIndex = recetasConHorarioActualizado.findIndex(
      (receta) => receta.id_receta === id
    );
    //   Eliminar una dosis
    if (recetaIndex !== -1) {
      recetasConHorarioActualizado[recetaIndex] = {
        ...recetasConHorarioActualizado[recetaIndex],
        dosis: recetasConHorarioActualizado[recetaIndex].dosis - 1,
      };
      // actualziar las dosis de la BD
      try {
        const response = await axios.put(
          `http://localhost:8082/editarReceta/${id}`,
          {
            dosis: recetasConHorarioActualizado[recetaIndex].dosis,
          }
        );
        console.log("Respuesta del servidor:", response.data);
      } catch (error) {
        console.error("Error al actualizar la receta:", error);
      }      
      // actualizar la fecha de la BD
      try {
        const response = await axios.put(
          `http://localhost:8082/modificarFecha/${id}`
        );
        console.log("Respuesta del servidor:", response.data);
      } catch (error) {
        console.error("Error al actualizar la fecha:", error);
      }
      // Eliminar la receta si ya no quedan dosis
      if (recetasConHorarioActualizado[recetaIndex].dosisConHorario.length === 0) {
        try {
          const response = await axios.delete(
            `http://localhost:8082/eliminarFecha/${id}`
          );
          console.log("Respuesta del servidor:", response.data);
        } catch (error) {
          console.error("Error al eliminar la fecha:", error);
        }
      }
    }
  };
  // para ver resultados
  console.log(recetasConHorarioActualizado);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToAdd, setUserToAdd] = useState("");
  const [users, setUsers] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAction = () => {
    if (userToAdd) {
      setUsers([...users, userToAdd]);
      setUserToAdd("");
    }
    setIsModalOpen(false);
  };

  const handleUserInputChange = (e) => {
    setUserToAdd(e.target.value);
  };

  return (
    <>
      <div className="bg-blue-200 overflow-y-auto h-screen">
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
              <table className="w-full mt-1">
                <tbody>
                  <tr key={recetasConHorarioActualizado}>
                    <td
                      className="bg-red-200"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="5"
                    >
                      <img
                        src={sol}
                        alt="sol"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  {recetasConHorarioActualizado.map((receta) => {
                    return (
                      <React.Fragment key={receta.id}>
                        {receta.primerasFechas.map((fechita) => {
                          if (
                            fechita.nombre_horario === "morning" &&
                            receta.dosisConHorario.length > 1
                          ) {
                            return (
                              <tr
                                key={receta.id}
                                className="bg-red-100 text-center"
                              >
                                <td>{receta.medicamento}</td>
                                <td>
                                  {receta.cantidad}
                                  {receta.unidad}
                                </td>
                                <td>
                                  {fechita.fecha.getHours()}:
                                  {fechita.fecha.getMinutes()}
                                </td>
                                <td>{fechita.fecha.toLocaleDateString()}</td>
                                <td>
                                  <div>
                                    <button
                                      onClick={(id) =>
                                        actualizarDosisActual(
                                          (id = receta.id_receta)
                                        )
                                      }
                                      className="bg-red-400 ml-1 text-white px-1 py-2 rounded-xl items-center m-auto text-xs"
                                    >
                                      Check
                                    </button>
                                    <button
                                      onClick={handleOpenModal}
                                      className="bg-red-400 ml-1 text-white px-1 py-2 my-1 rounded-xl text-xs"
                                    >
                                      Agregar comentario
                                    </button>
                                    <AddComentario
                                      id={receta.id_receta}
                                      isOpen={isModalOpen}
                                      onClose={handleCloseModal}
                                      onConfirm={handleConfirmAction}
                                      message="Agrega tu comentario"
                                      inputPlaceholder="Comentario"
                                      inputValue={userToAdd}
                                      onInputChange={handleUserInputChange}
                                    />
                                  </div>
                                  {receta.comentario}
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </React.Fragment>
                    );
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
                        verticalAlign: "middle",
                      }}
                      rowSpan="5"
                    >
                      <img
                        src={amanecer}
                        alt="amanecer"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  {recetasConHorarioActualizado.map((receta) => {
                    return (
                      <React.Fragment key={receta.id}>
                        {receta.primerasFechas.map((fechita) => {
                          if (
                            fechita.nombre_horario === "noon" &&
                            receta.dosisConHorario.length > 1
                          ) {
                            return (
                              <tr
                                key={receta.id}
                                className="bg-yellow-100 text-center"
                              >
                                <td>{receta.medicamento}</td>
                                <td>
                                  {receta.cantidad}
                                  {receta.unidad}
                                </td>
                                <td>
                                  {fechita.fecha.getHours()}:
                                  {fechita.fecha.getMinutes()}
                                </td>

                                <td>{fechita.fecha.toLocaleDateString()}</td>
                                <td>
                                  <div>
                                    <button
                                      onClick={(id) =>
                                        actualizarDosisActual(
                                          (id = receta.id_receta)
                                        )
                                      }
                                      className="bg-yellow-400 ml-1 text-white px-1 py-2 rounded-xl items-center m-auto text-xs"
                                    >
                                      Check
                                    </button>
                                    <button
                                      onClick={handleOpenModal}
                                      className="bg-yellow-400 ml-1 text-white px-1 py-2 my-1 rounded-xl text-xs"
                                    >
                                      Agregar comentario
                                    </button>
                                    <AddComentario
                                      id={receta.id_receta}
                                      isOpen={isModalOpen}
                                      onClose={handleCloseModal}
                                      onConfirm={handleConfirmAction}
                                      message="Agrega tu comentario"
                                      inputPlaceholder="Comentario"
                                      inputValue={userToAdd}
                                      onInputChange={handleUserInputChange}
                                    />
                                  </div>
                                  {receta.comentario}
                                </td>
                              </tr>
                            );
                          }
                          return null;
                        })}
                      </React.Fragment>
                    );
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
                      rowSpan="5"
                    >
                      <img
                        src={evening}
                        alt="evening"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  {recetasConHorarioActualizado.map((receta) => {
                    return (
                      <React.Fragment key={receta.id}>
                        {receta.primerasFechas.map((fechita) => {
                          if (
                            fechita.nombre_horario === "tarde" &&
                            receta.dosisConHorario.length > 1
                          ) {
                            return (
                              <tr
                                key={receta.id}
                                className="bg-green-100 text-center"
                              >
                                <td>{receta.medicamento}</td>
                                <td>
                                  {receta.cantidad}
                                  {receta.unidad}
                                </td>
                                <td>
                                  {fechita.fecha.getHours()}:
                                  {fechita.fecha.getMinutes()}
                                </td>
                                <td>{fechita.fecha.toLocaleDateString()}</td>
                                <td>
                                  <div>
                                    <button
                                      onClick={(id) =>
                                        actualizarDosisActual(
                                          (id = receta.id_receta)
                                        )
                                      }
                                      className="bg-green-400 ml-1 text-white px-1 py-2 rounded-xl items-center m-auto text-xs"
                                    >
                                      Check
                                    </button>
                                    <button
                                      onClick={handleOpenModal}
                                      className="bg-green-400 ml-1 text-white px-1 py-2 my-1 rounded-xl text-xs"
                                    >
                                      Agregar comentario
                                    </button>
                                    <AddComentario
                                      id={receta.id_receta}
                                      isOpen={isModalOpen}
                                      onClose={handleCloseModal}
                                      onConfirm={handleConfirmAction}
                                      message="Agrega tu comentario"
                                      inputPlaceholder="Comentario"
                                      inputValue={userToAdd}
                                      onInputChange={handleUserInputChange}
                                    />
                                  </div>
                                  {receta.comentario}
                                </td>
                              </tr>
                            );
                          }
                          return null;
                        })}
                      </React.Fragment>
                    );
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
                      rowSpan="5"
                    >
                      <img
                        src={luna}
                        alt="luna"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  {recetasConHorarioActualizado.map((receta) => {
                    return (
                      <React.Fragment key={receta.id}>
                        {receta.primerasFechas.map((fechita) => {
                          if (
                            fechita.nombre_horario === "night" &&
                            receta.dosisConHorario.length > 1
                          ) {
                            return (
                              <tr
                                key={receta.id}
                                className="bg-blue-100 text-center"
                              >
                                <td>{receta.medicamento}</td>
                                <td>
                                  {receta.cantidad}
                                  {receta.unidad}
                                </td>
                                <td>
                                  {fechita.fecha.getHours()}:
                                  {fechita.fecha.getMinutes()}
                                </td>
                                <td>{fechita.fecha.toLocaleDateString()}</td>
                                <td>
                                  <div>
                                    <button
                                      onClick={(id) =>
                                        actualizarDosisActual(
                                          (id = receta.id_receta)
                                        )
                                      }
                                      className="bg-blue-400 ml-1 text-white px-1 py-2 rounded-xl items-center m-auto text-xs"
                                    >
                                      Check
                                    </button>
                                    <button
                                      onClick={handleOpenModal}
                                      className="bg-blue-400 ml-1 text-white px-1 py-2 my-1 rounded-xl text-xs"
                                    >
                                      Agregar comentario
                                    </button>
                                    <AddComentario
                                      id={receta.id_receta}
                                      isOpen={isModalOpen}
                                      onClose={handleCloseModal}
                                      onConfirm={handleConfirmAction}
                                      message="Agrega tu comentario"
                                      inputPlaceholder="Comentario"
                                      inputValue={userToAdd}
                                      onInputChange={handleUserInputChange}
                                    />
                                  </div>
                                  {receta.comentario}
                                </td>
                              </tr>
                            );
                          }
                          return null;
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
              {/* */}
              <table className="w-full mt-1">
                <tbody>
                  <tr>
                    <td
                      className="bg-green-300"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="5"
                    >
                      <img
                        src={pastillas}
                        alt="pastillas"
                        style={{ display: "inline-block" }}
                      />
                    </td>
                  </tr>
                  {recetasConHorarioActualizado.map((receta) => {
                    if (receta.dosisConHorario.length === 1) {
                      const dosisUnica = receta.dosisConHorario[0];
                      const hours = dosisUnica?.fecha?.getHours() ?? "";
                      const minutes = dosisUnica?.fecha?.getMinutes() ?? "";
                      const fechaString =
                        dosisUnica?.fecha?.toLocaleDateString() ?? "";
                      return (
                        <tr
                          key={receta.id}
                          className="bg-green-200 text-center"
                        >
                          <td>{receta.medicamento}</td>
                          <td>
                            {receta.cantidad}
                            {receta.unidad}
                          </td>
                          <td>
                            {hours}:{minutes}
                          </td>
                          <td>{fechaString}</td>
                          <td>
                            <div>
                              <button
                                onClick={(id) =>
                                  actualizarDosisActual((id = receta.id_receta))
                                }
                                className="bg-green-500 ml-1 text-white px-1 py-2 rounded-xl items-center m-auto text-xs"
                              >
                                Check
                              </button>
                              <button
                                onClick={handleOpenModal}
                                className="bg-green-500 ml-1 text-white px-1 py-2 my-1 rounded-xl text-xs"
                              >
                                Agregar comentario
                              </button>
                              <AddComentario
                                id={receta.id_receta}
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                onConfirm={handleConfirmAction}
                                message="Agrega tu comentario"
                                inputPlaceholder="Comentario"
                                inputValue={userToAdd}
                                onInputChange={handleUserInputChange}
                              />
                            </div>
                            {receta.comentario}
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

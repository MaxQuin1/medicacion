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
  const [filasMostradas, setFilasMostradas] = useState(0);
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
      fechaActual = new Date(fechaActual.getTime() + intervalo);
      fechas.push(new Date(fechaActual));
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

  const compararFecha = async (e, id) => {
    e.preventDefault();
    const recetaIndex = recetasConHorarioActualizado.findIndex(
      (receta) => receta.id_receta === id
    );
    const fechaActual = new Date();
    if (
      fechaActual >=
      recetasConHorarioActualizado[recetaIndex].dosisConHorario[0].fecha
    ) {
      const actualizarDosisActual = async (id) => {
        // Buscar la receta correspondiente
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
          if (
            recetasConHorarioActualizado[recetaIndex].dosisConHorario.length ===
            0
          ) {
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
      await actualizarDosisActual(id);
    } else {
      alert("No es tiempo todavia de tomar tu pastilla");
      return;
    }
  };
  // para ver resultados
  //console.log(recetasConHorarioActualizado);

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
      <div className="bg-blue-200 overflow-y-auto h-screen pt-5">
        <div dir="rtl" className="b-0">
          <button className=" bg-blue-700 text-white px-3 mr-10 py-2 mb-1 font-bold uppercase rounded-3xl">
            <Link to={`/medicamentosPendientes/${id_usuario}`}>
              Medicamentos pendientes
            </Link>
          </button>
          <button className="bg-blue-700 text-white px-3 mr-5 py-2 mb-1 font-bold uppercase rounded-3xl">
            <Link to={`/medicamento/${id_usuario}`}>Agregar receta</Link>
          </button>
        </div>
        <div className="flex justify-center items-center m-4">
          <div className="bg-white rounded-lg shadow-lg p-1  lg:w-2/3">
            <div className="m-3 ">
              <table className="w-full bg-gray-100 rounded-t-lg  items-center ">
                <tbody>
                  <tr className="text-center">
                    <td>Medicamentos</td>
                    <td>Dosis</td>
                    <td>Tiempo</td>
                    <td>Día</td>
                    <td>Comentarios</td>
                  </tr>
                </tbody>
              </table>
                <table className="w-full mt-1 uno-table table-auto overflow-y-auto h-[20vh]">
                  <tbody className="max-h-[100px] ">
                    <tr key={recetasConHorarioActualizado} className="">
                      <td
                        className="#FD9998 "
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        rowSpan="10"
                      >
                        <img
                          src={sol}
                          alt="sol"
                          style={{ display: "inline-block" }}
                          className="m-2 h-[60px] w-[60px]"
                        />
                      </td>
                    </tr>
                    {recetasConHorarioActualizado.slice(0,3)
                      .map((receta) => {
                        return (
                          <React.Fragment key={receta.id}>
                            {receta.primerasFechas.map((fechita, index) => {
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
                                    <td>
                                      {fechita.fecha.toLocaleDateString()}
                                    </td>
                                    <td>
                                      <div>
                                        {index === 0 ? (
                                          <>
                                            <button
                                              onClick={(e) =>
                                                compararFecha(
                                                  e,
                                                  receta.id_receta
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
                                              onInputChange={
                                                handleUserInputChange
                                              }
                                            />
                                          </>
                                        ) : null}
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
              <table className="w-full mt-1 dos-table">
                <tbody className="max-h-[100px] overflow-scroll">
                  <tr>
                    <td
                      className="#FEEACA"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="10"
                    >
                      <img
                        src={amanecer}
                        alt="amanecer"
                        style={{ display: "inline-block" }}
                        className="m-2 h-[60px] w-[60px]"
                      />
                    </td>
                  </tr>
                  {recetasConHorarioActualizado.slice(0,3).map((receta) => {
                    return (
                      <React.Fragment key={receta.id}>
                        {receta.primerasFechas.map((fechita, index) => {
                          if (
                            fechita.nombre_horario === "noon" &&
                            receta.dosisConHorario.length > 1
                          ) {
                            return (
                              <tr
                                key={receta.id}
                                className="text-center"
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
                                    {index === 0 ? (
                                      <>
                                        <button
                                          onClick={(e) =>
                                            compararFecha(e, receta.id_receta)
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
                                      </>
                                    ) : null}
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
              <table className="w-full mt-1 tres-table table-auto overflow-y-scroll h-[100px]">
                <tbody className="max-h-[100px] overflow-scroll">
                  <tr className="">
                    <td
                      className="bg-[#7FE2DE]"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="10"
                    >
                      <img
                        src={evening}
                        alt="evening"
                        style={{ display: "inline-block" }}
                        className="m-2 h-[60px] w-[60px]"
                      />
                    </td>
                  </tr>
                  {recetasConHorarioActualizado.slice(0,3).map((receta) => {
                    return (
                      <React.Fragment key={receta.id}>
                        {receta.primerasFechas.map((fechita, index) => {
                          if (
                            fechita.nombre_horario === "tarde" &&
                            receta.dosisConHorario.length > 1
                          ) {
                            return (
                              <tr
                                key={receta.id}
                                className=' text-center'
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
                                    {index === 0 ? (
                                      <>
                                        <button
                                          onClick={(e) =>
                                            compararFecha(e, receta.id_receta)
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
                                      </>
                                    ) : null}
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
              <table className="w-full mt-1 cuatro-table table-auto overflow-y-scroll h-[100px]">
                <tbody className="max-h-[100px] overflow-scroll">
                  <tr>
                    <td
                      className="bg-blue-200"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="10"
                    >
                      <img
                        src={luna}
                        alt="luna"
                        style={{ display: "inline-block" }}
                        className="m-2 h-[60px] w-[60px]"
                      />
                    </td>
                  </tr>
                  {recetasConHorarioActualizado.slice(0,3).map((receta) => {
                    return (
                      <React.Fragment key={receta.id}>
                        {receta.primerasFechas.map((fechita, index) => {
                          if (
                            fechita.nombre_horario === "night" &&
                            receta.dosisConHorario.length > 1
                          ) {
                            return (
                              <tr
                                key={receta.id}
                                className="text-center"
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
                                    {index === 0 ? (
                                      <>
                                        <button
                                          onClick={(e) =>
                                            compararFecha(e, receta.id_receta)
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
                                      </>
                                    ) : null}
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
              <table className="rounded-b-lg w-full mt-1 cinco-table table-auto h-[100px] ">
                <tbody>
                  <tr className="mx-1">
                    <td
                      className="bg-[#a4cdbb]"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                      rowSpan="10"
                    >
                      <img
                        src={pastillas}
                        alt="pastillas"
                        style={{ display: "inline-block" }}
                        className="m-2 h-[60px] w-[60px]"
                      />
                    </td>
                  </tr>
                  {recetasConHorarioActualizado.slice(0,3).map((receta) => {
                    if (
                      receta.dosisConHorario.length === 1 &&
                      receta.fecha !== null
                    ) {
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
                                onClick={(e) =>
                                  compararFecha(e, receta.id_receta)
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

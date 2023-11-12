import React, { useState } from "react";
import Formulario from "../content/Formulario";
import { Link } from "react-router-dom";
import AddMedicamento from "./AddMedicamento";

function Medicamento() {
  const id_usuario = window.location.href.split("/")[4];

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
      <div className="bg-blue-200 h-screen ">
        <div className="ml-20 p-3">
          <h1 className="font-black text-5xl text-blue-900"> Nueva receta </h1>
          <p className="mt-4 text-2xl">
            Llena los campos para agregar a la receta
          </p>
          <div className="flex justify-end mr-20">
            <button className="bg-sky-900 text-white px-3 py-2 mb-1 font-bold uppercase rounded-3xl">
              <Link to={`/home/${id_usuario}`}>Regresar</Link>
            </button>
            <button
             onClick={handleOpenModal}
             className="bg-sky-900 ml-2 text-white px-3 py-3 mb-1 font-bold uppercase rounded-3xl">
              Agregar medicamento
              </button>
            <AddMedicamento
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirmAction}
              message="Agrega el medicamento"
              inputPlaceholder="Nombre del medicamento"
              inputValue={userToAdd}
              onInputChange={handleUserInputChange}
            />
          </div>
        </div>
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-2 mb-10">
          <Formulario />
        </div>
      </div>
    </>
  );
}

export default Medicamento;

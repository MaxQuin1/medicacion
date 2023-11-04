import React from "react";

function Formulario() {
  return (
    <>
      <table className="w-full text-left">
        <tr className="gap-4">
          <td className="text-xl">
            <div className="mb-4 mr-2">
              <label className="text-gray-800 ml-3" htmlFor="nombre">
                Nombre del medicamento:
              </label>
              <input
                id="Medicamento"
                type="text"
                className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-50"
                placeholder="Nombre del medicamento "
                name="Medicamento"
                onChange={"Medicamento"}
              />
            </div>
          </td>
          <td className="text-xl">
            <div className="mb-4">
              <label className="text-gray-800 ml-3" htmlFor="descrpcion">
                Vía:
              </label>
              <input
                id="Via"
                type="text"
                className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-50"
                placeholder="Vía"
                name="Vía"
                onChange={"Vía"}
              />
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
                onChange={"Medicamento"}
              />
            </div>
          </td>
          <td className="text-xl">
            <div className="mb-4">
              <label className="text-gray-800 ml-3" htmlFor="descrpcion">
                Unidad de medida:
              </label>
              <input
                id="medidad"
                type="medidad"
                className="mt-2 flow-root w-full p-3 rounded-xl  bg-gray-50"
                placeholder="Unidad de medida"
                name="medidad"
                onChange={"Unidad de medida:"}
              />
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
                onChange={"dias"}
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
                onChange={"horas"}
              />
            </div>
          </td>
        </tr>
      </table>
    </>
  );
}

export default Formulario;

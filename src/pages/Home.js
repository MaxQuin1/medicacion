import React from "react";

export default function Home() {
  return (
    <>
      <div className="bg-blue-200">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white rounded-lg shadow-lg p-5  lg:w-2/3">
            <div className="m-5 border">
              <table className="w-full">
                <tr className="text-center">
                  <td></td>
                  <td>Medications</td>
                  <td>Dosage</td>
                  <td>Time</td>
                  <td>Date</td>
                  <td>Comments</td>
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
                    rowSpan="5"
                  >
                    <box-icon
                      name="sun"
                      color="#9f4e4b"
                      style={{ display: "inline-block" }}
                    ></box-icon>
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
                    className="bg-yellow-200"
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "2px solid #FFFFFF",
                    }}
                    rowSpan="5"
                  >
                    <box-icon
                      name="sun"
                      color="#9f4e4b"
                      style={{ display: "inline-block" }}
                    ></box-icon>
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
              </table>
            </div>
          </div>
        </div>
        <div className="bg-green-100 w-[10%] text-center border rounded-xl ml-[10%] border-green-600 ">
          <button className="p-1 ">Receta</button>
        </div>
      </div>
    </>
  );
}

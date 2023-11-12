import React from 'react';

function AddMedicamento({ isOpen, onClose, onConfirm, message, inputPlaceholder, inputValue, onInputChange }) {
  if (!isOpen) {
    return null;
  }

  const buttonColor = "#99CCFF";

  return (
    <div className="fixed inset-0 shadow-2xl flex items-center justify-center z-50 rounded-xl">
      <div className="modal-overlay " onClick={onClose} />
      <div className="modal-container bg-white w-96 mx-auto rounded-lg shadow-xl z-50 ">
        <div className="modal-content p-4 bg-blue-200">
          <p className="text-lg font-bold">{message}</p>
          <input
            className='w-full border items-center rounded-lg p-1 m-auto'
            type="text"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onInputChange}
          />
        </div>
        <div className="modal-actions p-4 bg-gray-100">
          <button
            className="btn-primary mr-2 rounded-md p-2 "
            style={{ backgroundColor: buttonColor, color: '#1e3a8a' }}
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="btn-secondary rounded-md p-2"
            style={{ backgroundColor: buttonColor, color: '#1e3a8a' }}
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMedicamento;
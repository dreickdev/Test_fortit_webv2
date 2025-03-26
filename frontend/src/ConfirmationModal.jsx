// src/components/ConfirmationModal.jsx
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmar Eliminación</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="confirm-button">
                        Sí, eliminar
                    </button>
                    <button onClick={onClose} className="cancel-button">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
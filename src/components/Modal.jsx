import React from "react";

function Modal(props) {
  const handleCloseClick = () => {
    props.onClose();
  };

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={handleCloseClick}></div>
      <div className="modal-content">
        <h2>Modal Title</h2>
        <p>Modal body text goes here.</p>
        <button onClick={handleCloseClick}>Close</button>
      </div>
    </div>
  );
}

export default Modal;

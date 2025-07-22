import React, { useState } from "react";
import ModalEmail from "./ModalEmail";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitTicket = () => {
    alert("Ticket submitted!");
    closeModal();
  };
return(
 <div className="app">
      <nav className="nav">
        {/* <div className="logo">Ticket System</div> */}
        <div className="about">About</div>
      </nav>

      <div className="center-content">
        <h1 className="title">NOAH Ticket ark</h1>
        <button className="create-button" onClick={openModal}>
          Create a Ticket
        </button>
      </div>

      {isModalOpen && (
        <ModalEmail onClose={closeModal} onSubmit={submitTicket} />
      )}
    </div>
  );
}

export default App;
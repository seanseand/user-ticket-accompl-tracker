import React, { useState } from "react";
import ModalEmail from "./ModalEmail";
import SubmitAlert from "./SubmitAlert";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Issubmit_alertOpen, setIsSubmit_alertOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const submitTicket = (data) => {
    console.log("Ticket Submitted", data)
    setIsModalOpen(false)
    setIsSubmit_alertOpen(true);
  };
return(
 <div className="app">
      <nav className="nav">
        {/* <div className="logo">Ticket System</div> */}
        <div className="about">About</div>
        <div className="submitted-ticket">Submitted Ticket</div>
      </nav>

      <div className="center-content">
        <h1 className="title">NOAH Ticket ark</h1>
        <button className="create-button" onClick={openModal}>
          Create a Ticket
        </button>
        <button className="btnhistory"  >
          Ticket History
        </button>
      </div>

      {isModalOpen && (
        <ModalEmail onClose={closeModal} onSubmit={submitTicket} />
      )}

      {Issubmit_alertOpen && (
        <SubmitAlert onClose={() => setIsSubmit_alertOpen(false)}/>
      )}
    </div>
  );
}

export default App;
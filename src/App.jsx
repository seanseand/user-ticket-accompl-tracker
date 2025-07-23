import React, { useState } from "react";
import ModalEmail from "./ModalEmail";
import SubmitAlert from "./SubmitAlert";
import ModalSubmittedList from "./ModalSubmittedList";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Issubmit_alertOpen, setIsSubmit_alertOpen] = useState(false);
  const [isSubmittedListOpen, setIsSubmittedListOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitTicket = (data) => {
    console.log("Ticket Submitted", data)
    setIsModalOpen(false)
    setIsSubmit_alertOpen(true);
    setTimeout(() => {
      setIsSubmitAlertOpen(false);
      setIsSubmittedListOpen(true);
    }, 1500)
  };
return(
 <div className="app">
      <nav className="nav">
        {/* <div className="logo">Ticket System</div> */}
        <div className="about">About</div>
        {/* <div className="submitted-ticket">Submitted Ticket</div> */}
      </nav>

      <div className="center-content">
        <h1 className="title">NOAH Ticket ark</h1>
        <button className="create-button" onClick={openModal}>
          Create a Ticket
        </button>
        <button className="btnhistory" onClick={() => setIsHistoryOpen(true)} >
          Ticket History
        </button>
      </div>

      {isModalOpen && (
        <ModalEmail onClose={closeModal} onSubmit={submitTicket} />
      )}

      {Issubmit_alertOpen && (
        <SubmitAlert onClose={() => setIsSubmit_alertOpen(false)}/>
      )}

      {isHistoryOpen && (
      <ModalSubmittedList onClose={() => setIsHistoryOpen(false)} />
      )}

      {isSubmittedListOpen && (
        <ModalSubmittedList onClose={() => setIsSubmittedListOpen(false)} />
      )}
    </div>
  );
}

export default App;
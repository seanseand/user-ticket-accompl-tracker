

function ModalEmail({onClose, onSubmit}) {
    return (
    <div className="modal">
      <div className="modal-header">
        <span>New Ticket</span>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="modal-body">
        <input
          type="email"
          placeholder="Enter your email"
          className="input-field"
          
        />
        <input type="text" placeholder="Subject" className="input-field" />
        <textarea
          className="textarea-body"
          placeholder=""
        ></textarea>


        <div className="modal-footer">
          <button className="send-button" onClick={onSubmit}>
            Submit
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEmail;
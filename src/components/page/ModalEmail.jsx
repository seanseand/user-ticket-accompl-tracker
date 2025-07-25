import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"

function ModalEmail({onClose, onSubmit}) {
   const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit();
  };
    return (
    <div className="modal">
      <div className="modal-header">
        <span>New Ticket</span>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      </div>

 <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="input-field"
          />

          <input
            type="text"
            required
            placeholder="Subject"
            className="input-field"
          />

          <Textarea
            required
            className="textarea-body"
            placeholder="Message"
          />

          <div className="modal-footer">
            <button type="submit" className="send-button">
              Submit
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModalEmail;
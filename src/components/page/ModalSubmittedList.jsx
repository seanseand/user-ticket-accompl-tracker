import React, { useState } from "react";

const emails = [
  {
    sender: "Khester Mesa",
    subject: "auxghlann invited you to auxghlann/tutorial_git",
    preview: "GitHub home @auxghlann has invited you...",
    fullContent:
      "GitHub home @auxghlann has invited you to the tutorial_git repository. Please accept the invitation to collaborate.",
    time: "10:52 AM",
  },
  {
    sender: "Dragonpay",
    subject: "Payment Confirmation for Transaction Ref: MVA7MPUUU5",
    preview: "Congratulations! This is to confirm...",
    fullContent:
      "Congratulations! This is to confirm your payment with reference number MVA7MPUUU5. Thank you for using Dragonpay.",
    time: "Jul 20",
  },
  {
    sender: "BDO Online Banking",
    subject: "BDO Online Banking Username Retrieved",
    preview: "Hello! You've requested to retrieve...",
    fullContent:
      "Hello! You've requested to retrieve your BDO Online Banking username. Please check your security settings for verification.",
    time: "Jul 19",
  },
];

function ModalSubmittedList({ onClose }) {
  const [openedEmailIndex, setOpenedEmailIndex] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  const selectedEmail = openedEmailIndex !== null ? emails[openedEmailIndex] : null;

  const handleReply = () => {
    alert(`Reply sent to ${selectedEmail.sender}:\n\n${replyMessage}`);
    setReplyMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto p-6 relative">
        

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-lg"
        >
          ✕
        </button>

        {/* Email Details Page */}
        {selectedEmail ? (
          <div className="mt-6">
            <button
              onClick={() => setOpenedEmailIndex(null)}
              className="mb-4 text-blue-600 hover:underline text-sm"
            >
              ← Back to Inbox
            </button>
            <div className="space-y-2 mb-6">
              <div className="text-lg font-semibold text-gray-800">
                {selectedEmail.subject}
              </div>
              <div className="text-sm text-gray-600">From: {selectedEmail.sender}</div>
              <div className="text-sm text-gray-600">Time: {selectedEmail.time}</div>
              <hr className="my-4" />
              <div className="text-sm text-gray-800 whitespace-pre-line">
                {selectedEmail.fullContent}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-700 mb-1">Reply:</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                rows="4"
                placeholder={`Write a reply to ${selectedEmail.sender}`}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
              <button
                onClick={handleReply}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded"
              >
                Send Reply
              </button>
            </div>
          </div>
        ) : (
          // Email List Page
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Submitted Emails</h2>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              {emails.length > 0 ? (
                emails.map((email, index) => (
                  <div
                    key={index}
                    onClick={() => setOpenedEmailIndex(index)}
                    className="w-full text-left cursor-pointer flex flex-col p-4 border-b hover:bg-gray-50 transition duration-200 hover:shadow-md hover:scale-[1.01] transform"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">{email.sender}</div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium text-gray-900">{email.subject} - </span>
                          <span className="text-gray-500">{email.preview}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                        {email.time}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">No emails submitted yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalSubmittedList;

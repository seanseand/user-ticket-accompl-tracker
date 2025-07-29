import React, { useState } from "react";

const emails = [
  {
    sender: "Khester Mesa",
    subject: "auxghlann invited you to auxghlann/tutorial_git",
    preview: "GitHub home @auxghlann has invited you...",
    fullContent:
      "GitHub home @auxghlann has invited you to the tutorial_git repository. Please accept the invitation to collaborate.",
    time: "10:53 AM",
    priority: "High",
  },
  {
    sender: "Dragonpay",
    subject: "Payment Confirmation for Transaction Ref: MVA7MPUUU5",
    preview: "Congratulations! This is to confirm...",
    fullContent:
      "Congratulations! This is to confirm your payment with reference number MVA7MPUUU5. Thank you for using Dragonpay.",
    time: "Jul 20",
    priority: "High",
  },
  {
    sender: "BDO Online Banking",
    subject: "BDO Online Banking Username Retrieved",
    preview: "Hello! You've requested to retrieve...",
    fullContent:
      "Hello! You've requested to retrieve your BDO Online Banking username. Please check your security settings for verification.",
    time: "Jul 19",
    priority: "Medium",
  },
];

const EmailDetailsPage = ({ email, onBack }) => {
  const [replyMessage, setReplyMessage] = useState("");

  const handleReply = () => {
    alert(`Reply sent to ${email.sender}:\n\n${replyMessage}`);
    setReplyMessage("");
  };

  return (
    <div className="p-6 w-full min-h-screen bg-white">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to Inbox
      </button>
      <div className="space-y-2 mb-6">
        <div className="text-lg font-semibold text-gray-800">
          {email.subject}
        </div>
        <div className="text-sm text-gray-600">From: {email.sender}</div>
        <div className="text-sm text-gray-600">Time: {email.time}</div>
        <div className="text-sm text-gray-600">Priority: {email.priority}</div>
        <hr className="my-4" />
        <div className="text-sm text-gray-800 whitespace-pre-line">
          {email.fullContent}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-700 mb-1">Reply:</label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          rows="4"
          placeholder={`Write a reply to ${email.sender}`}
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
  );
};

const EmailItem = ({ email, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full text-left cursor-pointer flex flex-col p-4 border-b hover:bg-gray-50 transition duration-200 hover:shadow-md hover:scale-[1.01] transform"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-semibold text-sm text-gray-800">
            {email.sender}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium text-gray-900">
              {email.subject} -{" "}
            </span>
            <span className="text-gray-500">{email.preview}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 ml-4 whitespace-nowrap">
          {email.time}
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [openedEmailIndex, setOpenedEmailIndex] = useState(null);

  const priorities = ["High", "Medium", "Low"];
  const filteredEmails = emails.filter(
    (email) => email.priority === selectedPriority
  );

  const selectedEmail =
    openedEmailIndex !== null ? filteredEmails[openedEmailIndex] : null;

  if (selectedEmail) {
    return (
      <EmailDetailsPage
        email={selectedEmail}
        onBack={() => setOpenedEmailIndex(null)}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-7xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 pt-6">
          <div className="mb-6 flex justify-center gap-6">
            {priorities.map((priority) => (
              <button
                key={priority}
                className={`px-6 py-2 text-base font-medium rounded-md relative transition duration-200 ${
                  selectedPriority === priority
                    ? "text-blue-800 border-b-2 border-blue-500"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-800"
                }`}
                onClick={() => {
                  setSelectedPriority(priority);
                  setOpenedEmailIndex(null); // Reset selected email on priority change
                }}
              >
                {priority} Priority
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email, index) => (
                <EmailItem
                  key={index}
                  email={email}
                  onClick={() => setOpenedEmailIndex(index)}
                />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No emails in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

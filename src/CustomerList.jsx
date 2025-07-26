// CustomerList.jsx
import React, { useState } from "react";

const CustomerList = ({ customers, onDelete, onAddNote, onAddReminder }) => {
  const [noteInput, setNoteInput] = useState({});
  const [reminderInput, setReminderInput] = useState({});

  const handleNoteChange = (id, value) => {
    setNoteInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleReminderChange = (id, field, value) => {
    setReminderInput((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const submitNote = (id) => {
    if (noteInput[id]?.trim()) {
      onAddNote(id, noteInput[id]);
      setNoteInput((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const submitReminder = (id) => {
    const reminder = reminderInput[id];
    if (reminder?.date && reminder?.text) {
      onAddReminder(id, reminder);
      setReminderInput((prev) => ({ ...prev, [id]: { date: "", text: "" } }));
    }
  };

  return (
    <div className="lg:px-10 px-6">
      <h2 className="lg:text-5xl font-semibold text-gray-700 mb-7 text-3xl">Customer List</h2>
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {customers.length === 0 && <p>No customers yet.</p>}
        {customers.map((customer) => (
          <div key={customer.id} className="border text-gray-800 p-4 rounded mb-4 bg-gray-200">
            <h3 className="text-2xl font-semibold pb-3 text-purple-700">{customer.name}</h3>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Address: {customer.address}</p>

            {/* Notes */}
            <div className="mt-7 flex flex-col gap-2">
              <h4 className="font-medium">Notes:</h4>
              <ul className="list-disc list-inside text-sm">
                {customer.notes?.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Add a note..."
                className="mt-1 p-1 border rounded w-full"
                value={noteInput[customer.id] || ""}
                onChange={(e) => handleNoteChange(customer.id, e.target.value)}
              />
             <div>
             <button
                className="mt-1 bg-purple-700 text-white px-3 py-1 rounded"
                onClick={() => submitNote(customer.id)}
              >
                Add Note
              </button>
             </div>
            </div>

            {/* Reminders */}
            <div className="mt-4 flex flex-col gap-2">
              <h4 className="font-medium">Reminders:</h4>
              <ul className="list-disc list-inside text-sm">
                {customer.reminders?.map((r) => (
                  <li key={r.id}>
                    <strong>{r.date}:</strong> {r.text}
                  </li>
                ))}
              </ul>
              <input
                type="date"
                className="mt-1 p-1 border rounded w-full"
                value={reminderInput[customer.id]?.date || ""}
                onChange={(e) =>
                  handleReminderChange(customer.id, "date", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Reminder text"
                className="mt-1 p-1 border rounded w-full"
                value={reminderInput[customer.id]?.text || ""}
                onChange={(e) =>
                  handleReminderChange(customer.id, "text", e.target.value)
                }
              />
              <div>
              <button
                className="mt-1 bg-purple-700 text-white px-3 py-1 rounded"
                onClick={() => submitReminder(customer.id)}
              >
                Add Reminder
              </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <button
                className="bg-purple-700 text-white px-3 py-1 rounded"
                onClick={() => onDelete(customer.id)}
              >
                Delete
              </button>
              {/* Optional Edit */}
              {/* <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => onEdit(customer)}>Edit</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;

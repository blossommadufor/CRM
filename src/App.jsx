// App.jsx
import React, { useEffect, useState } from 'react';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import ConfirmModal from './ConfirmModal';

const DEFAULT_CUSTOMERS = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
    address: "Lagos, Nigeria",
    notes: ["Met at tech expo"],
    reminders: [
      { id: 1, date: "2025-08-01", text: "Call for contract renewal" }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "08087654321",
    address: "Abuja, Nigeria",
    notes: [],
    reminders: []
  },
  {
    "id": "c6",
    "name": "Grace Obi",
    "email": "grace.obi@example.com",
    "phone": "+2347030011223",
    "address": "25 Amina Way, Abuja",
    "notes": ["Requested brochure", "Followed up by phone"],
    "reminders": [
      { "id": "r1", "date": "2025-08-01", "text": "Call for feedback" }
    ]
  },
  {
    "id": "c7",
    "name": "Chinedu Eze",
    "email": "chinedu.eze@example.com",
    "phone": "+2347065544321",
    "address": "14 Nnamdi Azikiwe Street, Enugu",
    "notes": ["Interested in premium package"],
    "reminders": [
      { "id": "r2", "date": "2025-08-05", "text": "Send invoice" },
      { "id": "r3", "date": "2025-08-10", "text": "Follow-up email" }
    ]
  },
  {
    "id": "c8",
    "name": "Fatima Bello",
    "email": "fatima.bello@example.com",
    "phone": "+2348012345678",
    "address": "88 Kano Crescent, Kano",
    "notes": ["Wants monthly check-ins"],
    "reminders": [
      { "id": "r4", "date": "2025-08-15", "text": "Schedule monthly review" }
    ]
  },
];

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('crm-customers');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setCustomers(parsed);
      } else {
        localStorage.setItem('crm-customers', JSON.stringify(DEFAULT_CUSTOMERS));
        setCustomers(DEFAULT_CUSTOMERS);
      }
    } else {
      localStorage.setItem('crm-customers', JSON.stringify(DEFAULT_CUSTOMERS));
      setCustomers(DEFAULT_CUSTOMERS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('crm-customers', JSON.stringify(customers));
  }, [customers]);

  const handleAdd = (customer) => {
    setCustomers(prev => [...prev, { ...customer, id: Date.now(), notes: [], reminders: [] }]);
  };

  const handleEdit = (updated) => {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setCustomers(prev => prev.filter(c => c.id !== deleteId));
    setDeleteId(null);
    setShowConfirm(false);
  };

  const addNote = (id, note) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, notes: [...c.notes, note] } : c));
  };

  const addReminder = (id, reminder) => {
    setCustomers(prev => prev.map(c =>
      c.id === id ? { ...c, reminders: [...c.reminders, { id: Date.now(), ...reminder }] } : c
    ));
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" bg-gray-400">
     <div className='bg-purple-700 lg:px-10 px-4 py-4 flex items-center justify-between text-white'>
     <h1 className="lg:text-3xl text-xl font-bold">CRM Dashboard</h1>
     <p className='text-sm font-bold '>Group 8 - UA-CSC204</p>
     </div>

     <div className='flex items-center justify-center pt-10 pb-10 px-10 lg:px-0'>
     <input
        type="text"
        placeholder="Search customers..."
        className="mb-4 p-3 max-w-2xl border border-gray-400 rounded-lg w-full outline-0"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
     </div>


      <CustomerList
        customers={filteredCustomers}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAddNote={addNote}
        onAddReminder={addReminder}
      />

      {showConfirm && (
        <ConfirmModal
          message="Are you sure you want to delete this customer?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <CustomerForm onAdd={handleAdd} />
    </div>
  );
};

export default App;


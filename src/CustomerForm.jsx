import React, { useState } from "react";

const initialForm = { name: "", email: "", phone: "", address: "", notes: "" };

const CustomerForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    onAdd(form);
    setForm(initialForm);
  };

  return (
    <div className="pt-10 flex items-center justify-center pb-20">
      <div className="lg:w-3/5">
        <div className="shadow-xl px-4 py-4 bg-gray-200">
          <h2 className="text-3xl font-semibold mb-4 text-purple-700">
            Add A New Customer
          </h2>
          <form onSubmit={handleSubmit} className="mb-6 max-w-3xl pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-2 border rounded border-gray-300 outline-0"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 border rounded border-gray-300 outline-0"
                required
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="p-2 border rounded border-gray-300 outline-0"
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="p-2 border rounded border-gray-300 outline-0"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="px-4 py-2  bg-purple-700 text-white rounded"
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;

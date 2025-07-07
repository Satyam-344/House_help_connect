import React, { useState } from 'react';
import axios from 'axios';

function AddWorker() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    phone: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/worker', formData);
      if (res.status === 201) {
        setMessage('Worker added successfully ✅');
        setFormData({ name: '', type: '', location: '', phone: '' });
      }
    } catch (error) {
      console.error('Error adding worker:', error);
      setMessage('Something went wrong ❌');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register as a Worker</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />

        <input
          type="text"
          name="type"
          placeholder="Type (e.g., Maid, Caretaker)"
          value={formData.type}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '8px 0' }}
        />

        <button type="submit" style={{ padding: '10px 20px' }}>Add Worker</button>
      </form>

      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

export default AddWorker;

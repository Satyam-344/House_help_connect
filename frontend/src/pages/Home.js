import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [workers, setWorkers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/worker');
        setWorkers(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Error fetching workers:', err);
      }
    };

    fetchWorkers();
  }, []);

  useEffect(() => {
    let filteredList = workers;

    if (search.trim()) {
      filteredList = filteredList.filter((w) =>
        w.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      filteredList = filteredList.filter((w) => w.type === type);
    }

    if (location) {
      filteredList = filteredList.filter((w) => w.location === location);
    }

    setFiltered(filteredList);
  }, [search, type, location, workers]);

  const uniqueLocations = [...new Set(workers.map((w) => w.location))];
  const uniqueTypes = [...new Set(workers.map((w) => w.type))];

  return (
    <div style={{ padding: '20px' }}>
      {/* ✅ Banner Image */}
      <img
        src="/logo.png"
        alt="Banner"
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', marginBottom: '20px', borderRadius: '8px' }}
      />

      <h2>Available Workers</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="">All Types</option>
          {uniqueTypes.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {filtered.map((worker) => (
          <div
            key={worker._id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              width: '250px',
              borderRadius: '8px',
              background: '#f9f9f9',
            }}
          >
            <h3>{worker.name}</h3>
            <p><strong>Type:</strong> {worker.type}</p>
            <p><strong>Location:</strong> {worker.location}</p>
            <p><strong>Phone:</strong> {worker.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

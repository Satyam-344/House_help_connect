import React, { useEffect, useState } from 'react';
import axios from 'axios';
import locations from '../components/location'; // Ensure this file exports the location map

function Home() {
  const [workers, setWorkers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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
    setStates(Object.keys(locations));
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

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setCities(locations[selectedState] || []);
    setLocation('');
  };

  return (
    <div>
      <h1>Find Workers</h1>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="maid">Maid</option>
        <option value="cook">Cook</option>
        <option value="caretaker">Caretaker</option>
        {/* Add more if needed */}
      </select>

      <select onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        disabled={!cities.length}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <ul>
        {filtered.map((worker) => (
          <li key={worker._id}>
            {worker.name} - {worker.type} - {worker.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
